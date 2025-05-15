import SwiftUI

struct ContentView: View {
    let movies = Movie.sampleMovies
    
    var body: some View {
        NavigationView {
            ScrollView {
                LazyVGrid(columns: [
                    GridItem(.flexible()),
                    GridItem(.flexible())
                ], spacing: 16) {
                    ForEach(Array(movies.enumerated()), id: \.element.id) { index, movie in
                        NavigationLink(destination: MovieDetailWebView(movie: movie)) {
                            MovieCell(movie: movie)
                                .accessibilityIdentifier("movie-cell-\(index)")
                        }
                        .accessibilityIdentifier("movie-link-\(index)")
                    }
                }
                .padding()
            }
            .navigationTitle("Movies")
            .accessibilityIdentifier("movies-grid")
        }
    }
}

struct MovieCell: View {
    let movie: Movie
    
    var body: some View {
        VStack {
            AsyncImage(url: URL(string: movie.imageUrl)) { image in
                image
                    .resizable()
                    .aspectRatio(contentMode: .fill)
            } placeholder: {
                Color.gray
            }
            .frame(height: 150)
            .clipped()
            
            Text(movie.title)
                .font(.headline)
                .lineLimit(2)
                .padding(.vertical, 4)
        }
        .background(Color.white)
        .cornerRadius(8)
        .shadow(radius: 4)
    }
} 