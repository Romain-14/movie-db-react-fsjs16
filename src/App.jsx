import { useState, useEffect } from "react";
import "./App.css";

const API_KEY = "840523a722e0ffc0a860538562e81c5e";
const URL = "https://images.tmdb.org/t/p/original";

function App() {
	// initialiser une state pour recevoir la réponse du fetch
    const [movies, setMovies] = useState([]);

	// il s'execute apres le return et qu'une seule fois avec le tableau de dépendance vide au montage de ce composant
	// --> va invoquer une fonction async qui va fetch l'API TMDB 
    useEffect(() => {
        getMoviesList();
    }, []);

	// fonction fetch API qui va ensuite mettre à jour la state movie et du coup qui dit Mise à jour de state dit re-render du composant (nouvel affichage) du coup dans le return la state movies aura plusieurs éléments et donc sera capable de boucler pour afficher le contenu de chaque itération grace à la boucle map !
	const getMoviesList = async () => {
		const res = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`);
		const resParsed = await res.json();
		console.log(resParsed.results)
		setMovies(resParsed.results);
	}

	//render
	// il s'execute en premier avant le useEffect donc il faut penser à vérifier notre state movies pour pas faire planter l'appli
    return (
		<>
		<h1>moviedb</h1>
		{console.log(movies)}
		{/* {
			movies.length > 0
				?
				<p>{movies[0].title}</p>
				:
				<p>Loading ...</p>
		} */}
		{/* <p>{movies[0]?.title}</p> */}

		<section>
			<h2>trendings movies of da week !!</h2>

			{/* fonction ternaire qui check si la state movie contient des élément */}
			{movies.length > 0 
							?
							movies.map((movie, index) => { // boucle sur notre tableau de film et retourne l'itération en cours ( donc l'affiche )
								return (
									// une key est nécessaire pour faire le lien avec l'itération et un événement (type click) 
									<article key={movie.id}>
										<h3>{movie.title}</h3>
										<img src={`${URL}/${movie.poster_path}`} alt="" />
										<p>{movie.overview}</p>
									</article>
								)
							})
							:
							<p>Loading ...</p>
			}

		</section>

		{/* <p>{movies.length > 0 ? movies[0].title : "Loading ..."}</p> */}

		</>
	)
}

export default App;
