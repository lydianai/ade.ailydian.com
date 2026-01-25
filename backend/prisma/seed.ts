import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Clean existing data
  await prisma.auditLog.deleteMany()
  await prisma.employee.deleteMany()
  await prisma.taxReturn.deleteMany()
  await prisma.payment.deleteMany()
  await prisma.invoiceItem.deleteMany()
  await prisma.invoice.deleteMany()
  await prisma.customer.deleteMany()
  await prisma.session.deleteMany()
  await prisma.user.deleteMany()

  console.log('✅ Cleaned existing data')

  // Hash password for test users
  const hashedPassword = await bcrypt.hash('test123', 10)

  // Create test users
  const integrationUser = await prisma.user.create({
    data: {
      email: 'integrationtest@ade.com',
      emailVerified: true,
      passwordHash: hashedPassword,
      firstName: 'Integration',
      lastName: 'Test User',
      role: 'KOBI',
      status: 'ACTIVE',
      businessName: 'Test Integration A.Ş.',
      taxOffice: 'İstanbul Vergi Dairesi',
      taxNumber: '1234567890',
      kvkkConsent: true,
      kvkkConsentDate: new Date(),
    },
  })

  const esnafUser = await prisma.user.create({
    data: {
      email: 'esnaf@ade.com',
      emailVerified: true,
      phone: '+905551234567',
      phoneVerified: true,
      passwordHash: hashedPassword,
      firstName: 'Mehmet',
      lastName: 'Yılmaz',
      role: 'ESNAF',
      status: 'ACTIVE',
      businessName: 'Yılmaz Bakkaliyesi',
      taxOffice: 'Kadıköy Vergi Dairesi',
      taxNumber: '9876543210',
      kvkkConsent: true,
      kvkkConsentDate: new Date(),
    },
  })

  const kobiUser = await prisma.user.create({
    data: {
      email: 'kobi@ade.com',
      emailVerified: true,
      phone: '+905559876543',
      phoneVerified: true,
      passwordHash: hashedPassword,
      firstName: 'Ayşe',
      lastName: 'Demir',
      role: 'KOBI',
      status: 'ACTIVE',
      businessName: 'Demir Teknoloji Ltd.',
      taxOffice: 'Ankara Vergi Dairesi',
      taxNumber: '5555666677',
      mersisNo: '0123456789012345',
      kvkkConsent: true,
      kvkkConsentDate: new Date(),
    },
  })

  console.log('✅ Created test users')

  // Create customers for esnaf
  const customer1 = await prisma.customer.create({
    data: {
      userId: esnafUser.id,
      type: 'CORPORATE',
      companyName: 'ABC Teknoloji A.Ş.',
      taxOffice: 'İstanbul Vergi Dairesi',
      taxNumber: '1111222233',
      email: 'info@abcteknoloji.com',
      phone: '+902121234567',
      address: 'Maslak Mah. Büyükdere Cad. No:123',
      city: 'İstanbul',
      district: 'Sarıyer',
      postalCode: '34398',
      creditLimit: 100000,
      balance: 15250.50,
    },
  })

  const customer2 = await prisma.customer.create({
    data: {
      userId: esnafUser.id,
      type: 'CORPORATE',
      companyName: 'XYZ Ltd. Şti.',
      taxOffice: 'Ankara Vergi Dairesi',
      taxNumber: '4444555566',
      email: 'muhasebe@xyz.com',
      phone: '+903121234567',
      address: 'Çankaya Mah. Atatürk Bulvarı No:456',
      city: 'Ankara',
      district: 'Çankaya',
      postalCode: '06420',
      creditLimit: 75000,
      balance: -8900.00,
    },
  })

  const customer3 = await prisma.customer.create({
    data: {
      userId: kobiUser.id,
      type: 'CORPORATE',
      companyName: 'DEF İnşaat',
      taxOffice: 'İzmir Vergi Dairesi',
      taxNumber: '7777888899',
      email: 'mali@definsaat.com',
      phone: '+902321234567',
      address: 'Alsancak Mah. Cumhuriyet Bulvarı No:789',
      city: 'İzmir',
      district: 'Konak',
      postalCode: '35220',
      creditLimit: 250000,
      balance: 45600.00,
    },
  })

  const customer4 = await prisma.customer.create({
    data: {
      userId: kobiUser.id,
      type: 'INDIVIDUAL',
      firstName: 'Ali',
      lastName: 'Kaya',
      tcNo: '12345678901',
      email: 'ali.kaya@email.com',
      phone: '+905441234567',
      address: 'Ataşehir Mah. Barbaros Cad. No:45 Daire:8',
      city: 'İstanbul',
      district: 'Ataşehir',
      postalCode: '34758',
      balance: 2500.00,
    },
  })

  console.log('✅ Created customers')

  // Create invoices for esnaf user
  const invoice1 = await prisma.invoice.create({
    data: {
      userId: esnafUser.id,
      customerId: customer1.id,
      invoiceNo: 'FAT-2026-001',
      gibUuid: 'ETTN-' + Date.now() + '-001',
      type: 'E_FATURA',
      status: 'ACCEPTED',
      invoiceDate: new Date('2026-01-15'),
      dueDate: new Date('2026-02-15'),
      paidDate: new Date('2026-01-20'),
      subtotal: 12500.00,
      vatTotal: 2500.00,
      total: 15000.00,
      currency: 'TRY',
      paymentMethod: 'Havale',
      gibSentAt: new Date('2026-01-15T10:30:00'),
      items: {
        create: [
          {
            name: 'Web Sitesi Geliştirme',
            description: 'Kurumsal web sitesi tasarım ve geliştirme',
            quantity: 1,
            unit: 'Adet',
            unitPrice: 10000.00,
            vatRate: 20,
            subtotal: 10000.00,
            vatAmount: 2000.00,
            total: 12000.00,
          },
          {
            name: 'Logo Tasarımı',
            description: 'Profesyonel logo tasarımı',
            quantity: 1,
            unit: 'Adet',
            unitPrice: 2500.00,
            vatRate: 20,
            subtotal: 2500.00,
            vatAmount: 500.00,
            total: 3000.00,
          },
        ],
      },
    },
  })

  const invoice2 = await prisma.invoice.create({
    data: {
      userId: esnafUser.id,
      customerId: customer2.id,
      invoiceNo: 'FAT-2026-002',
      gibUuid: 'ETTN-' + Date.now() + '-002',
      type: 'E_FATURA',
      status: 'SENT',
      invoiceDate: new Date('2026-01-20'),
      dueDate: new Date('2026-02-20'),
      subtotal: 8500.00,
      vatTotal: 1700.00,
      total: 10200.00,
      currency: 'TRY',
      paymentMethod: 'Kredi Kartı',
      gibSentAt: new Date('2026-01-20T14:15:00'),
      items: {
        create: [
          {
            name: 'Danışmanlık Hizmeti',
            description: 'Dijital pazarlama danışmanlığı (10 saat)',
            quantity: 10,
            unit: 'Saat',
            unitPrice: 850.00,
            vatRate: 20,
            subtotal: 8500.00,
            vatAmount: 1700.00,
            total: 10200.00,
          },
        ],
      },
    },
  })

  const invoice3 = await prisma.invoice.create({
    data: {
      userId: kobiUser.id,
      customerId: customer3.id,
      invoiceNo: 'FAT-2026-003',
      gibUuid: 'ETTN-' + Date.now() + '-003',
      type: 'E_FATURA',
      status: 'ACCEPTED',
      invoiceDate: new Date('2026-01-18'),
      dueDate: new Date('2026-03-18'),
      paidDate: new Date('2026-01-22'),
      subtotal: 45000.00,
      vatTotal: 9000.00,
      discountTotal: 2250.00,
      total: 51750.00,
      currency: 'TRY',
      paymentMethod: 'Havale',
      gibSentAt: new Date('2026-01-18T09:00:00'),
      items: {
        create: [
          {
            name: 'Yazılım Geliştirme',
            description: 'Özel ERP yazılımı - Modül 1',
            quantity: 1,
            unit: 'Proje',
            unitPrice: 30000.00,
            vatRate: 20,
            discountRate: 5,
            subtotal: 30000.00,
            vatAmount: 6000.00,
            discountAmount: 1500.00,
            total: 34500.00,
          },
          {
            name: 'Sistem Entegrasyonu',
            description: 'ERP-CRM entegrasyon hizmeti',
            quantity: 1,
            unit: 'Adet',
            unitPrice: 15000.00,
            vatRate: 20,
            discountRate: 5,
            subtotal: 15000.00,
            vatAmount: 3000.00,
            discountAmount: 750.00,
            total: 17250.00,
          },
        ],
      },
    },
  })

  const invoice4 = await prisma.invoice.create({
    data: {
      userId: kobiUser.id,
      customerId: customer4.id,
      invoiceNo: 'FAT-2026-004',
      type: 'E_ARSIV',
      status: 'DRAFT',
      invoiceDate: new Date('2026-01-22'),
      dueDate: new Date('2026-02-22'),
      subtotal: 2500.00,
      vatTotal: 500.00,
      total: 3000.00,
      currency: 'TRY',
      items: {
        create: [
          {
            name: 'Web Hosting',
            description: 'Yıllık web hosting hizmeti',
            quantity: 1,
            unit: 'Yıl',
            unitPrice: 2500.00,
            vatRate: 20,
            subtotal: 2500.00,
            vatAmount: 500.00,
            total: 3000.00,
          },
        ],
      },
    },
  })

  const invoice5 = await prisma.invoice.create({
    data: {
      userId: esnafUser.id,
      customerId: customer1.id,
      invoiceNo: 'FAT-2026-005',
      gibUuid: 'ETTN-' + Date.now() + '-005',
      type: 'E_FATURA',
      status: 'REJECTED',
      invoiceDate: new Date('2026-01-23'),
      dueDate: new Date('2026-02-23'),
      subtotal: 5000.00,
      vatTotal: 1000.00,
      total: 6000.00,
      currency: 'TRY',
      gibSentAt: new Date('2026-01-23T11:00:00'),
      gibResponse: {
        error: 'GIB_VALIDATION_ERROR',
        message: 'Fatura tutarı eksik bildirilmiş',
        code: 'ERR_1234',
      },
      items: {
        create: [
          {
            name: 'SEO Optimizasyonu',
            description: 'Web sitesi SEO çalışması',
            quantity: 1,
            unit: 'Paket',
            unitPrice: 5000.00,
            vatRate: 20,
            subtotal: 5000.00,
            vatAmount: 1000.00,
            total: 6000.00,
          },
        ],
      },
    },
  })

  console.log('✅ Created invoices with items')

  // Create payments
  await prisma.payment.create({
    data: {
      userId: esnafUser.id,
      invoiceId: invoice1.id,
      customerId: customer1.id,
      amount: 15000.00,
      currency: 'TRY',
      method: 'Havale',
      status: 'COMPLETED',
      bankName: 'Ziraat Bankası',
      transactionId: 'TRX-2026-001234',
      paymentDate: new Date('2026-01-20'),
      valueDate: new Date('2026-01-20'),
    },
  })

  await prisma.payment.create({
    data: {
      userId: kobiUser.id,
      invoiceId: invoice3.id,
      customerId: customer3.id,
      amount: 51750.00,
      currency: 'TRY',
      method: 'EFT',
      status: 'COMPLETED',
      bankName: 'İş Bankası',
      transactionId: 'TRX-2026-005678',
      paymentDate: new Date('2026-01-22'),
      valueDate: new Date('2026-01-22'),
    },
  })

  await prisma.payment.create({
    data: {
      userId: esnafUser.id,
      invoiceId: invoice2.id,
      customerId: customer2.id,
      amount: 10200.00,
      currency: 'TRY',
      method: 'Kredi Kartı',
      status: 'PENDING',
      transactionId: 'TRX-2026-009876',
      paymentDate: new Date('2026-01-23'),
    },
  })

  console.log('✅ Created payments')

  // Create tax returns
  await prisma.taxReturn.create({
    data: {
      userId: esnafUser.id,
      type: 'KDV',
      period: '2025-12',
      year: 2025,
      month: 12,
      taxableAmount: 50000.00,
      taxAmount: 10000.00,
      status: 'PAID',
      gibReference: 'GIB-KDV-2025-12-001',
      submittedAt: new Date('2026-01-15'),
      paidAt: new Date('2026-01-20'),
      dueDate: new Date('2026-01-26'),
    },
  })

  await prisma.taxReturn.create({
    data: {
      userId: kobiUser.id,
      type: 'KDV',
      period: '2026-01',
      year: 2026,
      month: 1,
      taxableAmount: 75000.00,
      taxAmount: 15000.00,
      status: 'SUBMITTED',
      gibReference: 'GIB-KDV-2026-01-002',
      submittedAt: new Date('2026-01-22'),
      dueDate: new Date('2026-02-26'),
    },
  })

  await prisma.taxReturn.create({
    data: {
      userId: kobiUser.id,
      type: 'GELIR_VERGISI',
      period: '2025-12',
      year: 2025,
      month: 12,
      taxableAmount: 120000.00,
      taxAmount: 18000.00,
      status: 'DRAFT',
      dueDate: new Date('2026-02-15'),
    },
  })

  console.log('✅ Created tax returns')

  // Create employees for kobi user
  await prisma.employee.create({
    data: {
      userId: kobiUser.id,
      tcNo: '98765432109',
      firstName: 'Fatma',
      lastName: 'Özdemir',
      dateOfBirth: new Date('1990-05-15'),
      type: 'FULL_TIME_4A',
      startDate: new Date('2024-01-01'),
      grossSalary: 35000.00,
      netSalary: 24500.00,
      sgkNo: 'SGK-123456789',
      sgkRegistered: true,
      sgkStartDate: new Date('2024-01-01'),
      phone: '+905331234567',
      email: 'fatma.ozdemir@demirteknoloji.com',
      address: 'Çankaya Mah. Atatürk Bulvarı No:123 Daire:5',
      status: 'ACTIVE',
    },
  })

  await prisma.employee.create({
    data: {
      userId: kobiUser.id,
      tcNo: '11223344556',
      firstName: 'Can',
      lastName: 'Yıldız',
      dateOfBirth: new Date('1988-08-20'),
      type: 'FULL_TIME_4A',
      startDate: new Date('2023-06-15'),
      grossSalary: 42000.00,
      netSalary: 29400.00,
      sgkNo: 'SGK-987654321',
      sgkRegistered: true,
      sgkStartDate: new Date('2023-06-15'),
      phone: '+905441234567',
      email: 'can.yildiz@demirteknoloji.com',
      address: 'Yenimahalle Mah. İstiklal Cad. No:456',
      status: 'ACTIVE',
    },
  })

  await prisma.employee.create({
    data: {
      userId: kobiUser.id,
      tcNo: '55667788990',
      firstName: 'Zeynep',
      lastName: 'Arslan',
      dateOfBirth: new Date('1995-03-10'),
      type: 'PART_TIME_4A',
      startDate: new Date('2025-09-01'),
      endDate: new Date('2025-12-31'),
      grossSalary: 20000.00,
      netSalary: 14000.00,
      sgkNo: 'SGK-555666777',
      sgkRegistered: true,
      sgkStartDate: new Date('2025-09-01'),
      phone: '+905551234567',
      email: 'zeynep.arslan@demirteknoloji.com',
      status: 'INACTIVE',
    },
  })

  console.log('✅ Created employees')

  // Create audit logs
  await prisma.auditLog.create({
    data: {
      userId: esnafUser.id,
      action: 'CREATE',
      resource: 'Invoice',
      resourceId: invoice1.id,
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      changes: {
        action: 'created',
        invoice: invoice1.invoiceNo,
      },
    },
  })

  await prisma.auditLog.create({
    data: {
      userId: kobiUser.id,
      action: 'UPDATE',
      resource: 'Customer',
      resourceId: customer3.id,
      ipAddress: '192.168.1.101',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      changes: {
        before: { balance: 40000 },
        after: { balance: 45600 },
      },
    },
  })

  await prisma.auditLog.create({
    data: {
      userId: esnafUser.id,
      action: 'LOGIN',
      resource: 'User',
      resourceId: esnafUser.id,
      ipAddress: '192.168.1.102',
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X)',
    },
  })

  console.log('✅ Created audit logs')

  // Print summary
  const userCount = await prisma.user.count()
  const customerCount = await prisma.customer.count()
  const invoiceCount = await prisma.invoice.count()
  const paymentCount = await prisma.payment.count()
  const taxReturnCount = await prisma.taxReturn.count()
  const employeeCount = await prisma.employee.count()

  console.log('\n📊 Database Seeding Complete!')
  console.log('================================')
  console.log(`👥 Users: ${userCount}`)
  console.log(`🏢 Customers: ${customerCount}`)
  console.log(`📄 Invoices: ${invoiceCount}`)
  console.log(`💰 Payments: ${paymentCount}`)
  console.log(`📝 Tax Returns: ${taxReturnCount}`)
  console.log(`👷 Employees: ${employeeCount}`)
  console.log('================================')
  console.log('\n🔑 Test User Credentials:')
  console.log('Email: integrationtest@ade.com | Password: test123')
  console.log('Email: esnaf@ade.com | Password: test123')
  console.log('Email: kobi@ade.com | Password: test123')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
