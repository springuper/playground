import Foundation

struct Movie: Identifiable {
    let id = UUID()
    let title: String
    let imageUrl: String
    let description: String
}

// Sample data
extension Movie {
    static let sampleMovies = [
        Movie(
            title: "The Matrix",
            imageUrl: "https://picsum.photos/200/300",
            description: "A computer programmer discovers a mysterious world beneath reality."
        ),
        Movie(
            title: "Inception",
            imageUrl: "https://picsum.photos/200/300",
            description: "A thief who steals corporate secrets through dream-sharing technology."
        ),
        Movie(
            title: "Interstellar",
            imageUrl: "https://picsum.photos/200/300",
            description: "Explorers travel through a wormhole in search of a new home for humanity."
        ),
        Movie(
            title: "The Dark Knight",
            imageUrl: "https://picsum.photos/200/300",
            description: "Batman faces his greatest challenge against the Joker in Gotham City."
        )
    ]
} 