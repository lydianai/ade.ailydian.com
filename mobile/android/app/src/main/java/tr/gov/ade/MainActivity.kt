package tr.gov.ade

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.core.*
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import dagger.hilt.android.AndroidEntryPoint
import kotlinx.coroutines.delay
import tr.gov.ade.core.auth.AuthViewModel
import tr.gov.ade.core.theme.ADETheme
import tr.gov.ade.features.auth.LoginScreen
import tr.gov.ade.features.auth.OnboardingScreen
import tr.gov.ade.features.auth.RegisterScreen
import tr.gov.ade.features.dashboard.DashboardScreen
import tr.gov.ade.features.ecommerce.ECommerceScreen
import tr.gov.ade.features.egovernment.EGovernmentScreen
import tr.gov.ade.features.ai.AIAssistantScreen
import tr.gov.ade.features.profile.ProfileScreen

/**
 * Main Activity - Entry point of ADE Android Application
 *
 * Features:
 * - Edge-to-edge UI with proper insets
 * - Splash screen with animated logo
 * - Navigation based on authentication state
 * - Dependency injection with Hilt
 * - Material 3 Design System
 *
 * @author ADE Mobile Team
 * @since 2026-01-24
 */
@AndroidEntryPoint
class MainActivity : ComponentActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        // Install splash screen before super.onCreate
        installSplashScreen()

        super.onCreate(savedInstanceState)

        // Enable edge-to-edge display
        enableEdgeToEdge()

        setContent {
            ADETheme {
                val authViewModel: AuthViewModel = viewModel()
                val navController = rememberNavController()
                var showSplash by remember { mutableStateOf(true) }

                // Show splash for 2 seconds
                LaunchedEffect(Unit) {
                    delay(2000)
                    showSplash = false
                }

                AnimatedVisibility(
                    visible = showSplash,
                    enter = fadeIn(),
                    exit = fadeOut()
                ) {
                    SplashScreen()
                }

                AnimatedVisibility(
                    visible = !showSplash,
                    enter = fadeIn(),
                    exit = fadeOut()
                ) {
                    ADEApp(
                        authViewModel = authViewModel,
                        navController = navController
                    )
                }
            }
        }
    }
}

/**
 * Main App Composable
 * Handles navigation based on authentication state
 */
@Composable
fun ADEApp(
    authViewModel: AuthViewModel,
    navController: NavHostController
) {
    val isAuthenticated by authViewModel.isAuthenticated.collectAsState()

    LaunchedEffect(isAuthenticated) {
        if (isAuthenticated) {
            navController.navigate("dashboard") {
                popUpTo("onboarding") { inclusive = true }
            }
        } else {
            navController.navigate("onboarding") {
                popUpTo(0) { inclusive = true }
            }
        }
    }

    Surface(
        modifier = Modifier.fillMaxSize(),
        color = MaterialTheme.colorScheme.background
    ) {
        NavHost(
            navController = navController,
            startDestination = if (isAuthenticated) "dashboard" else "onboarding"
        ) {
            // Authentication Flow
            composable("onboarding") {
                OnboardingScreen(
                    onNavigateToLogin = { navController.navigate("login") },
                    onNavigateToRegister = { navController.navigate("register") }
                )
            }

            composable("login") {
                LoginScreen(
                    authViewModel = authViewModel,
                    onNavigateToRegister = { navController.navigate("register") },
                    onNavigateToForgotPassword = { navController.navigate("forgot_password") },
                    onLoginSuccess = {
                        navController.navigate("dashboard") {
                            popUpTo(0) { inclusive = true }
                        }
                    }
                )
            }

            composable("register") {
                RegisterScreen(
                    authViewModel = authViewModel,
                    onNavigateToLogin = { navController.navigate("login") },
                    onRegisterSuccess = {
                        navController.navigate("dashboard") {
                            popUpTo(0) { inclusive = true }
                        }
                    }
                )
            }

            // Main App Flow
            composable("dashboard") {
                DashboardScreen(navController = navController)
            }

            composable("ecommerce") {
                ECommerceScreen(navController = navController)
            }

            composable("egovernment") {
                EGovernmentScreen(navController = navController)
            }

            composable("ai_assistant") {
                AIAssistantScreen(navController = navController)
            }

            composable("profile") {
                ProfileScreen(
                    authViewModel = authViewModel,
                    navController = navController
                )
            }
        }
    }
}

/**
 * Splash Screen with animated ADE logo
 */
@Composable
fun SplashScreen() {
    // Animated gradient background
    val infiniteTransition = rememberInfiniteTransition(label = "gradient")
    val offsetX by infiniteTransition.animateFloat(
        initialValue = 0f,
        targetValue = 1000f,
        animationSpec = infiniteRepeatable(
            animation = tween(3000, easing = LinearEasing),
            repeatMode = RepeatMode.Reverse
        ),
        label = "offsetX"
    )

    // Scale animation for logo
    val scale by animateFloatAsState(
        targetValue = 1f,
        animationSpec = spring(
            dampingRatio = Spring.DampingRatioMediumBouncy,
            stiffness = Spring.StiffnessLow
        ),
        label = "scale"
    )

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(
                Brush.linearGradient(
                    colors = listOf(
                        Color(0xFFF97316), // Primary
                        Color(0xFFFB923C), // Secondary
                        Color(0xFF14B8A6)  // Accent
                    ),
                    start = androidx.compose.ui.geometry.Offset(offsetX, 0f),
                    end = androidx.compose.ui.geometry.Offset(offsetX + 500f, 500f)
                )
            ),
        contentAlignment = Alignment.Center
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center,
            modifier = Modifier.padding(32.dp)
        ) {
            // App Icon
            Box(
                modifier = Modifier
                    .size(120.dp)
                    .shadow(20.dp, RoundedCornerShape(26.dp))
                    .clip(RoundedCornerShape(26.dp))
                    .background(Color.White)
                    .graphicsLayer {
                        scaleX = scale
                        scaleY = scale
                    }
            ) {
                Image(
                    painter = painterResource(id = R.drawable.app_icon),
                    contentDescription = "ADE Logo",
                    modifier = Modifier.fillMaxSize()
                )
            }

            Spacer(modifier = Modifier.height(24.dp))

            // App Name
            Text(
                text = "ADE",
                fontSize = 48.sp,
                fontWeight = FontWeight.Bold,
                color = Color.White
            )

            Text(
                text = "Akıllı Devlet Ekosistemi",
                fontSize = 16.sp,
                fontWeight = FontWeight.Medium,
                color = Color.White.copy(alpha = 0.9f)
            )

            Spacer(modifier = Modifier.height(20.dp))

            // Loading Indicator
            CircularProgressIndicator(
                modifier = Modifier.size(40.dp),
                color = Color.White,
                strokeWidth = 4.dp
            )
        }
    }
}

/**
 * Bottom Navigation Bar
 */
@Composable
fun BottomNavigationBar(
    navController: NavHostController,
    modifier: Modifier = Modifier
) {
    NavigationBar(
        modifier = modifier,
        containerColor = MaterialTheme.colorScheme.surface,
        tonalElevation = 8.dp
    ) {
        NavigationBarItem(
            icon = {
                Icon(
                    painter = painterResource(id = R.drawable.ic_dashboard),
                    contentDescription = "Dashboard"
                )
            },
            label = { Text("Panel") },
            selected = false,
            onClick = { navController.navigate("dashboard") }
        )

        NavigationBarItem(
            icon = {
                Icon(
                    painter = painterResource(id = R.drawable.ic_building),
                    contentDescription = "E-Devlet"
                )
            },
            label = { Text("E-Devlet") },
            selected = false,
            onClick = { navController.navigate("egovernment") }
        )

        NavigationBarItem(
            icon = {
                Icon(
                    painter = painterResource(id = R.drawable.ic_shopping_bag),
                    contentDescription = "E-Ticaret"
                )
            },
            label = { Text("E-Ticaret") },
            selected = false,
            onClick = { navController.navigate("ecommerce") }
        )

        NavigationBarItem(
            icon = {
                Icon(
                    painter = painterResource(id = R.drawable.ic_sparkles),
                    contentDescription = "AI Asistan"
                )
            },
            label = { Text("AI") },
            selected = false,
            onClick = { navController.navigate("ai_assistant") }
        )

        NavigationBarItem(
            icon = {
                Icon(
                    painter = painterResource(id = R.drawable.ic_person),
                    contentDescription = "Profil"
                )
            },
            label = { Text("Profil") },
            selected = false,
            onClick = { navController.navigate("profile") }
        )
    }
}
