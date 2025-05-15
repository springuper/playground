import SwiftUI
import WebKit

struct MovieDetailWebView: View {
    let movie: Movie
    
    var body: some View {
        WebView(movie: movie)
            .accessibilityIdentifier("movie-detail-webview")
            .navigationBarTitleDisplayMode(.inline)
    }
}

struct WebView: UIViewRepresentable {
    let movie: Movie
    
    func makeUIView(context: Context) -> WKWebView {
        let config = WKWebViewConfiguration()
        config.applicationNameForUserAgent = "MovieApp WebView"
        
        // Configure webpage preferences
        let preferences = WKWebpagePreferences()
        preferences.allowsContentJavaScript = true
        config.defaultWebpagePreferences = preferences
        
        // Enable debugging
        config.preferences.setValue(true, forKey: "developerExtrasEnabled")
        
        // Create WebView with debugging enabled
        let webView = WKWebView(frame: .zero, configuration: config)
        webView.navigationDelegate = context.coordinator
        webView.accessibilityIdentifier = "movie-detail-webview-content"
        
        // Enable inspection
        if #available(iOS 16.4, *) {
            webView.isInspectable = true
        }
        
        // Use non-persistent data store for testing
        webView.configuration.websiteDataStore = .nonPersistent()
        
        // Load content with a delay to ensure proper initialization
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
            self.loadDetailPage(in: webView)
        }
        
        return webView
    }
    
    func updateUIView(_ webView: WKWebView, context: Context) {
        // No update needed
    }
    
    func makeCoordinator() -> Coordinator {
        Coordinator()
    }
    
    private func loadDetailPage(in webView: WKWebView) {
        // Create HTML content with movie details and styling
        let html = """
        <!DOCTYPE html>
        <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>\(movie.title)</title>
            <style>
                body {
                    font-family: -apple-system, system-ui;
                    margin: 20px;
                    line-height: 1.6;
                    color: #333;
                }
                .movie-title {
                    font-size: 24px;
                    font-weight: bold;
                    margin-bottom: 16px;
                    color: #000;
                }
                .movie-description {
                    font-size: 16px;
                    margin-bottom: 20px;
                }
            </style>
            <script>
                window.addEventListener('load', function() {
                    window.webkit.messageHandlers.readyForTesting?.postMessage('ready');
                });
            </script>
        </head>
        <body>
            <div class="movie-title" id="title">\(movie.title)</div>
            <div class="movie-description" id="description">\(movie.description)</div>
        </body>
        </html>
        """
        
        webView.loadHTMLString(html, baseURL: nil)
    }
    
    class Coordinator: NSObject, WKNavigationDelegate, WKScriptMessageHandler {
        func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
            print("WebView finished loading")
            // Set a custom attribute to indicate the WebView is ready
            webView.evaluateJavaScript("document.documentElement.setAttribute('data-webview-ready', 'true');")
        }
        
        func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) {
            print("WebView failed to load: \(error.localizedDescription)")
        }
        
        func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) {
            print("WebView failed provisional navigation: \(error.localizedDescription)")
        }
        
        func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
            if message.name == "readyForTesting" {
                print("WebView content is ready for testing")
            }
        }
    }
} 