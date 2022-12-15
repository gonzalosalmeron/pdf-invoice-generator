import React, { useEffect, useState } from 'react'
import PdfTmpl from '../../components/PdfTmpl.jsx';
import Products from '../../components/Products.jsx';
import { PDFViewer } from '@react-pdf/renderer';

function Builder() {
	const [data, setData] = useState(
		{pro:{
			name: "Antonio Robles Martinez",
			dni: "2342345J",
			address: "Calle granada x",
			city: "Almaeira",
			province: "Almeria",
			cp: "00934",
		},
		cus:{
			name: "",
			dni: "",
			address: "",
			city: "",
			province: "",
			cp: "",
		},
		products:[],
		base: "0.00",
		iva: 0,
		date: ""
	});
	const [crrDate, setCrrDate] = useState();


	/**
	 * Update the product list
	 */
	const updateProducts = (newData) => {
		setData((prev => ({...prev, products: newData, base: base(newData)})));
	}

	/**
	 * Calculates the plus of every product
	 */
	const base = (array) => {
		let base = array.reduce((pre, curr) => {
			return (curr.amount * curr.price) + pre;
		}, 0);

		return base.toFixed(2);
	}

	const handleDate = (e) => setData((prev) => ({...prev, date: e.target.value}));
	
	useEffect(() => {
		let date = new Date();
		date = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
		setData((prev) => ({...prev, date: date}));
	}, []);

	/** Styles for inputs */
	const inputStyle = "bg-white text-gray-700 text-sm ring-2 ring-gray-100 focus:ring-blue-400 transition duration-300 outline-none rounded mt-1 block py-1.5 px-4";
	const labelStyle = "font-medium text-sm pl-2 -mb-1 text-gray-800 w-1/3";
	const inputBoxStyle = "flex items-baseline gap-4";

	return (
		<div className="min-h-screen bg-gray-50 py-20">
			<div className="bg-white w-full max-w-4xl min-h-[1200px] mx-auto px-16 py-20 flex flex-col justify-between">
				<div>
					<div className="flex justify-end">
						{/* header */}
						<div className="flex items-baseline gap-2">
							<label htmlFor="date" className="font-semibold pl-2 whitespace-nowrap">Fecha factura:</label>
							<input id="date" name="date" type="date" 
								value={data.date} 
								onChange={ handleDate }
								className={ inputStyle } />
						</div>
					</div>
					{/* provider and client info */}
					<div className="flex justify-between gap-8 lg:gap-10 xl:gap-20 pt-8 pb-8">
						{/* provider */}
						<div className="w-1/2">
							<p className="font-bold text-lg pb-2">Información del proovedor</p>
							<div className="flex flex-col gap-2">
								<div className={ inputBoxStyle }>
									<label htmlFor="proName" className={labelStyle}>Nombre </label>
									<input type="text" id="proName" name="proName" className={inputStyle + " w-2/3"} 
										value={data.pro.name} 
										onChange={(e) => setData((prev) => ({...prev, pro: {...prev.pro, name: e.target.value}}))} />
								</div>
								<div className={ inputBoxStyle }>
									<label htmlFor="proDni" className={labelStyle}>DNI/CIF </label>
									<input type="text" id="proDni" name="proDni" className={inputStyle + " w-2/3"} 
										value={data.pro.dni} 
										onChange={(e) => setData((prev) => ({...prev, pro: {...prev.pro, dni: e.target.value}}))} />
								</div>
								<div className={ inputBoxStyle }>
									<label htmlFor="proAddress" className={labelStyle}>Dirección </label>
									<input type="text" id="proAddress" name="proAddress" className={inputStyle + " w-2/3"} 
										value={data.pro.address} 
										onChange={(e) => setData((prev) => ({...prev, pro: {...prev.pro, address: e.target.value}}))} />
								</div>
								<div className={ inputBoxStyle }>
									<label htmlFor="proCity" className={labelStyle}>Población </label>
									<input type="text" id="proCity" name="proCity" className={inputStyle + " w-2/3"} 
										value={data.pro.city} 
										onChange={(e) => setData((prev) => ({...prev, pro: {...prev.pro, city: e.target.value}}))} />
								</div>
								<div className={ inputBoxStyle }>
									<label htmlFor="proProvince" className={labelStyle}>Provincia </label>
									<input type="text" id="proProvince" name="proProvince" className={inputStyle + " w-2/3"} 
										value={data.pro.province} 
										onChange={(e) => setData((prev) => ({...prev, pro: {...prev.pro, province: e.target.value}}))} />
								</div>
								<div className={ inputBoxStyle }>
									<label htmlFor="proCp" className={labelStyle}>C.P </label>
									<input type="text" id="proCp" name="proCp" className={inputStyle + " w-2/3"} 
										value={data.pro.cp} 
										onChange={(e) => setData((prev) => ({...prev, pro: {...prev.pro, cp: e.target.value}}))} />
								</div>
							</div>
						</div>
						{/* client */}
						<div className="w-1/2">
							<p className="font-bold text-lg pb-2">Información del cliente</p>
							<div className="flex flex-col gap-2">
								<div className={ inputBoxStyle }>
									<label htmlFor="cusName" className={labelStyle}>Nombre </label>
									<input type="text" id="cusName" name="cusName" className={inputStyle + " w-2/3"} 
										value={data.cus.name} 
										onChange={(e) => setData((prev) => ({...prev, cus: {...prev.cus, name: e.target.value}}))} />
								</div>
								<div className={ inputBoxStyle }>
									<label htmlFor="cusDni" className={labelStyle}>DNI/CIF </label>
									<input type="text" id="cusDni" name="cusDni" className={inputStyle + " w-2/3"} 
										value={data.cus.dni} 
										onChange={(e) => setData((prev) => ({...prev, cus: {...prev.cus, dni: e.target.value}}))} />
								</div>
								<div className={ inputBoxStyle }>
									<label htmlFor="cusAddress" className={labelStyle}>Dirección </label>
									<input type="text" id="cusAddress" name="cusAddress" className={inputStyle + " w-2/3"} 
										value={data.cus.address} 
										onChange={(e) => setData((prev) => ({...prev, cus: {...prev.cus, address: e.target.value}}))} />
								</div>
								<div className={ inputBoxStyle }>
									<label htmlFor="cusCity" className={labelStyle}>Población </label>
									<input type="text" id="cusCity" name="cusCity" className={inputStyle + " w-2/3"} 
										value={data.cus.city} 
										onChange={(e) => setData((prev) => ({...prev, cus: {...prev.cus, city: e.target.value}}))} />
								</div>
								<div className={ inputBoxStyle }>
									<label htmlFor="cusProvince" className={labelStyle}>Provincia </label>
									<input type="text" id="cusProvince" name="cusProvince" className={inputStyle + " w-2/3"} 
										value={data.cus.province} 
										onChange={(e) => setData((prev) => ({...prev, cus: {...prev.cus, province: e.target.value}}))} />
								</div>
								<div className={ inputBoxStyle }>
									<label htmlFor="cusCp" className={labelStyle}>C.P </label>
									<input type="text" id="cusCp" name="cusCp" className={inputStyle + " w-2/3"} 
										value={data.cus.cp} 
										onChange={(e) => setData((prev) => ({...prev, cus: {...prev.cus, cp: e.target.value}}))} />
								</div>
							</div>
						</div>
					</div>
					{/* products */}
					<Products inputStyle={ inputStyle } update={ updateProducts } />
				</div>

				<div className="flex justify-end">
					{/* summary */}
					<div className="flex flex-col justify-end pb-8 w-1/2">
						<div className="w-full text-right flex flex-col gap-2 border-b border-gray-200 pb-3">
							{/* base */}
							<div className="flex items-end gap-4">
								<p className="w-1/3 text-lg text-gray-500">Base:</p>
								<div className="w-2/3 flex items-center gap-4">
									<div className="w-1/3"></div>
									<div className="w-2/3 border-t border-gray-200">
										<p className="font-semibold pt-1 pr-4 text-zinc-800">{ (data.base) } €</p>
									</div>
								</div>
							</div>
							{/* iva */}
							<div className="flex items-end gap-4">
								<p className="w-1/3 text-lg text-gray-500">IVA:</p>
								<div className="w-2/3 flex items-center gap-4">
									<div className="w-1/3">
										<select name="iva" id="iva"
											onChange={ (e) => setData((prev) => ({...prev, iva: (e.target.value / 100)})) } 
											className={inputStyle + " text-right"}
											>
											{ [...Array(22)].map((x, i) => <option key={i} value={ i }>{i}%</option> ) }
										</select>
									</div>
									<div className="w-2/3 border-t border-gray-200">
										<p className="font-semibold pt-1 pr-4 text-zinc-800">{ (data.iva * data.base).toFixed(2) } €</p>
									</div>
								</div>
							</div>
						</div>
						{/* base */}
						<div className="flex items-end gap-4 text-right pt-2">
							<p className="w-1/3 text-lg text-gray-500">Total:</p>
							<div className="w-2/3 flex items-center gap-4">
								<div className="w-1/3"></div>
								<div className="w-2/3">
									<p className="font-semibold pt-1 pr-4 text-zinc-800">{ (parseFloat(data.iva * data.base) + parseFloat(data.base)).toFixed(2) } €</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="w-full mx-auto max-w-4xl pt-8">
				<button className="bg-green-100 hover:bg-green-200 text-green-600 px-4 py-2 font-semibold text-lg rounded-xl w-full">Generar PDF</button>
			</div>
			<div className="w-full max-w-4xl h-[90vh] mx-auto pt-4">
				<PDFViewer style={{ width: "100%", height: "100%" }}>
					<PdfTmpl data={ data }></PdfTmpl>
				</PDFViewer>
			</div>
		</div>
	)
}

export default Builder