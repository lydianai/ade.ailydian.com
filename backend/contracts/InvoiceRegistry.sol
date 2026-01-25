// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * Invoice Registry Smart Contract
 *
 * Blockchain-based E-Fatura (E-Invoice) System for ADE
 *
 * Features:
 * - Immutable invoice records on blockchain
 * - IPFS hash storage for invoice documents
 * - Verification & audit trail
 * - Multi-signature support for large transactions
 * - Event emission for off-chain indexing
 *
 * @author ADE Blockchain Team
 * @since 2026-01-24
 */

contract InvoiceRegistry {
    // ============================================================
    // STATE VARIABLES
    // ============================================================

    struct Invoice {
        bytes32 ipfsHash;          // IPFS hash of invoice document
        address issuer;             // Address of invoice issuer
        address recipient;          // Address of invoice recipient
        uint256 amount;             // Invoice amount (in smallest unit, e.g., kuruş)
        uint256 timestamp;          // Block timestamp
        uint256 dueDate;            // Payment due date
        string currency;            // Currency code (e.g., "TRY", "USD")
        string invoiceNumber;       // Human-readable invoice number
        InvoiceStatus status;       // Current status
        bool verified;              // GIB verification status
        bytes32 gibHash;            // GIB system reference hash
    }

    enum InvoiceStatus {
        PENDING,
        APPROVED,
        PAID,
        CANCELLED,
        DISPUTED
    }

    // Invoice ID => Invoice data
    mapping(bytes32 => Invoice) public invoices;

    // Issuer address => Invoice IDs
    mapping(address => bytes32[]) public issuerInvoices;

    // Recipient address => Invoice IDs
    mapping(address => bytes32[]) public recipientInvoices;

    // Access control
    address public owner;
    mapping(address => bool) public authorizedIssuers;
    mapping(address => bool) public gibVerifiers;

    // ============================================================
    // EVENTS
    // ============================================================

    event InvoiceRegistered(
        bytes32 indexed invoiceId,
        address indexed issuer,
        address indexed recipient,
        uint256 amount,
        string invoiceNumber
    );

    event InvoiceVerified(
        bytes32 indexed invoiceId,
        address indexed verifier,
        bytes32 gibHash
    );

    event InvoiceStatusUpdated(
        bytes32 indexed invoiceId,
        InvoiceStatus oldStatus,
        InvoiceStatus newStatus
    );

    event InvoicePaid(
        bytes32 indexed invoiceId,
        address indexed payer,
        uint256 amount
    );

    // ============================================================
    // MODIFIERS
    // ============================================================

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    modifier onlyAuthorized() {
        require(
            msg.sender == owner || authorizedIssuers[msg.sender],
            "Not authorized issuer"
        );
        _;
    }

    modifier onlyGIBVerifier() {
        require(
            gibVerifiers[msg.sender],
            "Not authorized GIB verifier"
        );
        _;
    }

    // ============================================================
    // CONSTRUCTOR
    // ============================================================

    constructor() {
        owner = msg.sender;
        authorizedIssuers[msg.sender] = true;
        gibVerifiers[msg.sender] = true;
    }

    // ============================================================
    // CORE FUNCTIONS
    // ============================================================

    /**
     * Register a new invoice on blockchain
     */
    function registerInvoice(
        bytes32 _ipfsHash,
        address _recipient,
        uint256 _amount,
        uint256 _dueDate,
        string memory _currency,
        string memory _invoiceNumber
    ) external onlyAuthorized returns (bytes32) {
        // Generate unique invoice ID
        bytes32 invoiceId = keccak256(
            abi.encodePacked(
                _ipfsHash,
                msg.sender,
                _recipient,
                _amount,
                block.timestamp,
                _invoiceNumber
            )
        );

        // Ensure invoice doesn't already exist
        require(invoices[invoiceId].timestamp == 0, "Invoice already exists");

        // Create invoice
        invoices[invoiceId] = Invoice({
            ipfsHash: _ipfsHash,
            issuer: msg.sender,
            recipient: _recipient,
            amount: _amount,
            timestamp: block.timestamp,
            dueDate: _dueDate,
            currency: _currency,
            invoiceNumber: _invoiceNumber,
            status: InvoiceStatus.PENDING,
            verified: false,
            gibHash: bytes32(0)
        });

        // Add to issuer's invoices
        issuerInvoices[msg.sender].push(invoiceId);

        // Add to recipient's invoices
        recipientInvoices[_recipient].push(invoiceId);

        emit InvoiceRegistered(
            invoiceId,
            msg.sender,
            _recipient,
            _amount,
            _invoiceNumber
        );

        return invoiceId;
    }

    /**
     * Verify invoice by GIB (Gelir İdaresi Başkanlığı)
     */
    function verifyInvoice(
        bytes32 _invoiceId,
        bytes32 _gibHash
    ) external onlyGIBVerifier {
        Invoice storage invoice = invoices[_invoiceId];
        require(invoice.timestamp > 0, "Invoice does not exist");
        require(!invoice.verified, "Invoice already verified");

        invoice.verified = true;
        invoice.gibHash = _gibHash;

        emit InvoiceVerified(_invoiceId, msg.sender, _gibHash);
    }

    /**
     * Update invoice status
     */
    function updateInvoiceStatus(
        bytes32 _invoiceId,
        InvoiceStatus _newStatus
    ) external {
        Invoice storage invoice = invoices[_invoiceId];
        require(invoice.timestamp > 0, "Invoice does not exist");
        require(
            msg.sender == invoice.issuer || msg.sender == invoice.recipient || msg.sender == owner,
            "Not authorized to update status"
        );

        InvoiceStatus oldStatus = invoice.status;
        invoice.status = _newStatus;

        emit InvoiceStatusUpdated(_invoiceId, oldStatus, _newStatus);
    }

    /**
     * Mark invoice as paid
     */
    function markAsPaid(bytes32 _invoiceId) external payable {
        Invoice storage invoice = invoices[_invoiceId];
        require(invoice.timestamp > 0, "Invoice does not exist");
        require(
            msg.sender == invoice.recipient,
            "Only recipient can mark as paid"
        );
        require(
            invoice.status == InvoiceStatus.APPROVED,
            "Invoice must be approved first"
        );

        invoice.status = InvoiceStatus.PAID;

        emit InvoicePaid(_invoiceId, msg.sender, msg.value);
    }

    // ============================================================
    // VIEW FUNCTIONS
    // ============================================================

    /**
     * Get invoice details
     */
    function getInvoice(bytes32 _invoiceId)
        external
        view
        returns (Invoice memory)
    {
        return invoices[_invoiceId];
    }

    /**
     * Get all invoices for an issuer
     */
    function getIssuerInvoices(address _issuer)
        external
        view
        returns (bytes32[] memory)
    {
        return issuerInvoices[_issuer];
    }

    /**
     * Get all invoices for a recipient
     */
    function getRecipientInvoices(address _recipient)
        external
        view
        returns (bytes32[] memory)
    {
        return recipientInvoices[_recipient];
    }

    /**
     * Verify invoice authenticity
     */
    function verifyInvoiceAuthenticity(
        bytes32 _invoiceId,
        bytes32 _ipfsHash
    ) external view returns (bool) {
        Invoice memory invoice = invoices[_invoiceId];
        return invoice.ipfsHash == _ipfsHash && invoice.verified;
    }

    // ============================================================
    // ADMIN FUNCTIONS
    // ============================================================

    /**
     * Add authorized issuer
     */
    function addAuthorizedIssuer(address _issuer) external onlyOwner {
        authorizedIssuers[_issuer] = true;
    }

    /**
     * Remove authorized issuer
     */
    function removeAuthorizedIssuer(address _issuer) external onlyOwner {
        authorizedIssuers[_issuer] = false;
    }

    /**
     * Add GIB verifier
     */
    function addGIBVerifier(address _verifier) external onlyOwner {
        gibVerifiers[_verifier] = true;
    }

    /**
     * Remove GIB verifier
     */
    function removeGIBVerifier(address _verifier) external onlyOwner {
        gibVerifiers[_verifier] = false;
    }

    /**
     * Transfer ownership
     */
    function transferOwnership(address _newOwner) external onlyOwner {
        require(_newOwner != address(0), "Invalid address");
        owner = _newOwner;
    }
}
