//
//  ADEApp.swift
//  ADE - Akıllı Devlet Ekosistemi
//
//  Created on 24/01/2026.
//  Copyright © 2026 ADE Teknoloji A.Ş. All rights reserved.
//

import SwiftUI

@main
struct ADEApp: App {
    // MARK: - Properties

    @StateObject private var authManager = AuthenticationManager.shared
    @StateObject private var networkMonitor = NetworkMonitor.shared
    @StateObject private var themeManager = ThemeManager.shared

    // MARK: - App Lifecycle

    init() {
        configureAppearance()
        configureAnalytics()
    }

    // MARK: - Body

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(authManager)
                .environmentObject(networkMonitor)
                .environmentObject(themeManager)
                .preferredColorScheme(themeManager.currentTheme == .dark ? .dark : .light)
                .onAppear {
                    performStartupTasks()
                }
        }
    }

    // MARK: - Configuration

    private func configureAppearance() {
        // Navigation Bar Appearance
        let appearance = UINavigationBarAppearance()
        appearance.configureWithOpaqueBackground()
        appearance.backgroundColor = UIColor(named: "Background")
        appearance.titleTextAttributes = [
            .foregroundColor: UIColor(named: "Primary") ?? .orange,
            .font: UIFont.systemFont(ofSize: 18, weight: .semibold)
        ]

        UINavigationBar.appearance().standardAppearance = appearance
        UINavigationBar.appearance().compactAppearance = appearance
        UINavigationBar.appearance().scrollEdgeAppearance = appearance

        // Tab Bar Appearance
        let tabBarAppearance = UITabBarAppearance()
        tabBarAppearance.configureWithOpaqueBackground()
        tabBarAppearance.backgroundColor = UIColor(named: "Background")

        UITabBar.appearance().standardAppearance = tabBarAppearance
        UITabBar.appearance().scrollEdgeAppearance = tabBarAppearance
    }

    private func configureAnalytics() {
        #if !DEBUG
        // Analytics.initialize()
        // Crashlytics.initialize()
        #endif
    }

    private func performStartupTasks() {
        Task {
            // Check biometric availability
            await authManager.checkBiometricAvailability()

            // Sync data if authenticated
            if authManager.isAuthenticated {
                await DataSyncManager.shared.performStartupSync()
            }

            // Check for app updates
            await AppUpdateManager.shared.checkForUpdates()
        }
    }
}

// MARK: - Content View

struct ContentView: View {
    @EnvironmentObject var authManager: AuthenticationManager
    @State private var showSplash = true

    var body: some View {
        Group {
            if showSplash {
                SplashView()
                    .transition(.opacity)
            } else if authManager.isAuthenticated {
                MainTabView()
                    .transition(.move(edge: .trailing))
            } else {
                OnboardingView()
                    .transition(.move(edge: .leading))
            }
        }
        .animation(.easeInOut(duration: 0.5), value: showSplash)
        .animation(.easeInOut(duration: 0.5), value: authManager.isAuthenticated)
        .onAppear {
            DispatchQueue.main.asyncAfter(deadline: .now() + 2) {
                showSplash = false
            }
        }
    }
}

// MARK: - Splash View

struct SplashView: View {
    @State private var animateGradient = false
    @State private var scale: CGFloat = 0.8
    @State private var opacity: Double = 0

    var body: some View {
        ZStack {
            // Animated gradient background
            LinearGradient(
                colors: [
                    Color("Primary"),
                    Color("Secondary"),
                    Color("Accent")
                ],
                startPoint: animateGradient ? .topLeading : .bottomTrailing,
                endPoint: animateGradient ? .bottomTrailing : .topLeading
            )
            .ignoresSafeArea()
            .onAppear {
                withAnimation(.easeInOut(duration: 2).repeatForever(autoreverses: true)) {
                    animateGradient.toggle()
                }
            }

            VStack(spacing: 24) {
                // App Icon
                Image("AppIconImage")
                    .resizable()
                    .frame(width: 120, height: 120)
                    .clipShape(RoundedRectangle(cornerRadius: 26.25))
                    .shadow(color: .black.opacity(0.3), radius: 20, x: 0, y: 10)
                    .scaleEffect(scale)
                    .opacity(opacity)

                // App Name
                Text("ADE")
                    .font(.system(size: 48, weight: .bold, design: .rounded))
                    .foregroundStyle(.white)
                    .opacity(opacity)

                Text("Akıllı Devlet Ekosistemi")
                    .font(.system(size: 16, weight: .medium))
                    .foregroundStyle(.white.opacity(0.9))
                    .opacity(opacity)

                // Loading indicator
                ProgressView()
                    .progressViewStyle(CircularProgressViewStyle(tint: .white))
                    .scaleEffect(1.5)
                    .padding(.top, 20)
                    .opacity(opacity)
            }
        }
        .onAppear {
            withAnimation(.spring(response: 0.8, dampingFraction: 0.6)) {
                scale = 1.0
                opacity = 1.0
            }
        }
    }
}

// MARK: - Main Tab View

struct MainTabView: View {
    @State private var selectedTab = 0

    var body: some View {
        TabView(selection: $selectedTab) {
            DashboardView()
                .tabItem {
                    Label("Gösterge Paneli", systemImage: "square.grid.2x2")
                }
                .tag(0)

            IntegrationsView()
                .tabItem {
                    Label("Entegrasyonlar", systemImage: "building.2")
                }
                .tag(1)

            ECommerceView()
                .tabItem {
                    Label("E-Ticaret", systemImage: "bag")
                }
                .tag(2)

            AIAssistantView()
                .tabItem {
                    Label("AI Asistan", systemImage: "sparkles")
                }
                .tag(3)

            ProfileView()
                .tabItem {
                    Label("Profil", systemImage: "person.circle")
                }
                .tag(4)
        }
        .accentColor(Color("Primary"))
    }
}

// MARK: - Onboarding View

struct OnboardingView: View {
    @EnvironmentObject var authManager: AuthenticationManager
    @State private var currentPage = 0

    private let onboardingPages = [
        OnboardingPage(
            icon: "building.2.fill",
            title: "E-Devlet Entegrasyonu",
            description: "8,000+ devlet hizmetine tek yerden erişin. GİB, SGK, MERSIS ve daha fazlası.",
            color: Color("Primary")
        ),
        OnboardingPage(
            icon: "bag.fill",
            title: "E-Ticaret Yönetimi",
            description: "Hepsiburada, Trendyol, N11, Amazon TR. Tüm satış kanallarınızı tek yerden yönetin.",
            color: Color("Secondary")
        ),
        OnboardingPage(
            icon: "sparkles",
            title: "AI Asistan",
            description: "Yapay zeka destekli asistanınız 7/24 yanınızda. Sesli komutlarla işlemleri hızlandırın.",
            color: Color("Accent")
        ),
        OnboardingPage(
            icon: "lock.shield.fill",
            title: "Banka Seviyesi Güvenlik",
            description: "Face ID, Touch ID ve AES-256 şifreleme ile verileriniz güvende.",
            color: .blue
        )
    ]

    var body: some View {
        VStack {
            // Page indicator
            HStack(spacing: 8) {
                ForEach(0..<onboardingPages.count, id: \.self) { index in
                    Capsule()
                        .fill(currentPage == index ? Color("Primary") : Color.gray.opacity(0.3))
                        .frame(width: currentPage == index ? 30 : 8, height: 8)
                        .animation(.spring(), value: currentPage)
                }
            }
            .padding(.top, 50)

            // Content
            TabView(selection: $currentPage) {
                ForEach(0..<onboardingPages.count, id: \.self) { index in
                    OnboardingPageView(page: onboardingPages[index])
                        .tag(index)
                }
            }
            .tabViewStyle(.page(indexDisplayMode: .never))

            // Buttons
            VStack(spacing: 16) {
                if currentPage == onboardingPages.count - 1 {
                    Button {
                        // Navigate to login
                    } label: {
                        Text("Giriş Yap")
                            .font(.headline)
                            .foregroundColor(.white)
                            .frame(maxWidth: .infinity)
                            .padding()
                            .background(Color("Primary"))
                            .clipShape(RoundedRectangle(cornerRadius: 16))
                    }

                    Button {
                        // Navigate to register
                    } label: {
                        Text("Kayıt Ol")
                            .font(.headline)
                            .foregroundColor(Color("Primary"))
                            .frame(maxWidth: .infinity)
                            .padding()
                            .background(Color("Primary").opacity(0.1))
                            .clipShape(RoundedRectangle(cornerRadius: 16))
                    }
                } else {
                    Button {
                        withAnimation {
                            currentPage += 1
                        }
                    } label: {
                        Text("İleri")
                            .font(.headline)
                            .foregroundColor(.white)
                            .frame(maxWidth: .infinity)
                            .padding()
                            .background(Color("Primary"))
                            .clipShape(RoundedRectangle(cornerRadius: 16))
                    }

                    Button {
                        withAnimation {
                            currentPage = onboardingPages.count - 1
                        }
                    } label: {
                        Text("Atla")
                            .font(.subheadline)
                            .foregroundColor(.gray)
                    }
                }
            }
            .padding(.horizontal, 32)
            .padding(.bottom, 50)
        }
    }
}

// MARK: - Models

struct OnboardingPage {
    let icon: String
    let title: String
    let description: String
    let color: Color
}

struct OnboardingPageView: View {
    let page: OnboardingPage

    var body: some View {
        VStack(spacing: 32) {
            Image(systemName: page.icon)
                .font(.system(size: 100))
                .foregroundStyle(
                    LinearGradient(
                        colors: [page.color, page.color.opacity(0.7)],
                        startPoint: .topLeading,
                        endPoint: .bottomTrailing
                    )
                )
                .padding(.top, 60)

            VStack(spacing: 16) {
                Text(page.title)
                    .font(.system(size: 28, weight: .bold))
                    .multilineTextAlignment(.center)

                Text(page.description)
                    .font(.system(size: 16))
                    .foregroundColor(.secondary)
                    .multilineTextAlignment(.center)
                    .padding(.horizontal, 32)
            }

            Spacer()
        }
    }
}

// MARK: - Preview

#Preview("App") {
    ContentView()
        .environmentObject(AuthenticationManager.shared)
        .environmentObject(NetworkMonitor.shared)
        .environmentObject(ThemeManager.shared)
}

#Preview("Splash") {
    SplashView()
}

#Preview("Onboarding") {
    OnboardingView()
        .environmentObject(AuthenticationManager.shared)
}
