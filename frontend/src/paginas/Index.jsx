import Dropzone from "../components/Dropzone"
import { Link } from "react-router-dom"
import useApp from "../hooks/useApp"
import Alerta from "../components/Alerta"


const Index = () => {
	const { alerta, url, setUrl } = useApp();
	const { msg } = alerta;

	const handleClick = () => {
		navigator.clipboard.writeText(`${import.meta.env.VITE_FRONTEND_URL}/enlaces/${url}`)
		setUrl('')
	}


	return (
		<div className="md:w-4/5 mx-auto ">

			{url ? (
				<div className="flex flex-col gap-10 mt-4 items-center">
				<p className="text-center text-4xl">
					<span className="font-bold text-red-700 uppercase">Tu URL es: </span>{import.meta.env.VITE_FRONTEND_URL}/enlaces/{url}</p>
				<button
						onClick={handleClick}
						className="bg-red-500 hover:bg-gray-800 transition-colors p-2 w-64 text-white uppercase font-bold rounded-lg cursor-pointer"
						type="button"
				>Copiar enlace</button>
				</div>
			) : (
				<>
					{msg && <Alerta alerta={alerta} />}
					<div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
						<Dropzone />

						<div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
							<h2 className="text-4xl font-sans font-bold text-gray-800 my-4">
								Comparte archivos de forma sencilla y privada
							</h2>
							<p className="text-lg leading-loose mb-4">
								<span className="text-red-500 font-bold">NodeSend </span>
								te permite compartir archivos con cifrado de extremo a extremo.
								Los archivos después de ser descargados serán eliminados, de
								manera que puedes mantener lo que compartes en privado y
								asegurarte de que no permanezcan en línea para siempre.
							</p>
							<Link
								className="text-red-500 font-bold text-lg hover:text-red-700"
								to={"/crearcuenta"}
							>
								Crea una cuenta y obtén más ventajas
							</Link>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Index;
