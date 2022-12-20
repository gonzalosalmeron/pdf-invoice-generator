import React, { useEffect, useState } from 'react'
import PdfTmpl from '../../components/PdfTmpl.jsx';
import Products from '../../components/Products.jsx';
import PdfInput from '../../components/PdfInput.jsx'
import { PDFViewer } from '@react-pdf/renderer';

function Builder() {
	const [data, setData] = useState({
		pro:{ name: "", dni: "", address: "", city: "", province: "", cp: ""},
		cus:{ name: "", dni: "", address: "", city: "", province: "", cp: ""},
		products:[],
		base: "0.00",
		iva: 0,
		date: "",
		num: 1,
	});

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

	const handleData = (key, value) => setData((prev) => ({...prev, [key]: value}));
	const handlePro = (key, value) => setData((prev) => ({...prev, pro: {...prev.pro, [key]: value}}));
	const handleCus = (key, value) => setData((prev) => ({...prev, cus: {...prev.cus, [key]: value}}));
	
	useEffect(() => {
		let date = new Date();
		date = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
		setData((prev) => ({...prev, date: date}));
	}, []);

	return (
		<div className="min-h-screen bg-gray-50 md:py-20">
			<div className="bg-white w-full max-w-4xl min-h-[1200px] mx-auto px-16 py-20 flex flex-col justify-between">
				<div>
					<div className="flex justify-end gap-5">
						{/* header */}
						<PdfInput label='Fecha factura: ' name='date'  type='date' cssLabel='font-bold'
							update={(e) => handleData('date', e)} value={data.date} />
						<PdfInput label='Número factura: ' name='num'  type='tel' cssLabel='font-bold' cssInput='w-[80px]'
							update={(e) => handleData('num', e)} value={data.num} />
					</div>
					{/* provider and client info */}
					<div className="flex justify-between gap-8 lg:gap-10 xl:gap-20 pt-8 pb-8">
						{/* provider */}
						<div className="w-1/2">
							<p className="font-bold text-lg pb-2">Información del proovedor</p>
							<div className="flex flex-col gap-2">
								<PdfInput label='Nombre' name='proName' cssLabel='w-1/3' cssInput='w-2/3'
									update={(e) => handlePro('name', e)} value={data.pro.name} />
								<PdfInput label='DNI/CIF' name='proDni' cssLabel='w-1/3' cssInput='w-2/3'
									update={(e) => handlePro('dni', e)} value={data.pro.dni} />
								<PdfInput label='Dirección' name='proAddress' cssLabel='w-1/3' cssInput='w-2/3'
									update={(e) => handlePro('address', e)} value={data.pro.address} />
								<PdfInput label='Población' name='proCity' cssLabel='w-1/3' cssInput='w-2/3'
									update={(e) => handlePro('city', e)} value={data.pro.city} />
								<PdfInput label='Provincia' name='proProvince' cssLabel='w-1/3' cssInput='w-2/3'
									update={(e) => handlePro('province', e)} value={data.pro.province} />
								<PdfInput label='C.P' name='proCp' type='tel' cssLabel='w-1/3' cssInput='w-2/3'
									update={(e) => handlePro('cp', e)} value={data.pro.cp} />
							</div>
						</div>
						{/* client */}
						<div className="w-1/2">
							<p className="font-bold text-lg pb-2">Información del cliente</p>
							<div className="flex flex-col gap-2">
								<PdfInput label='Nombre' name='cusName' cssLabel='w-1/3' cssInput='w-2/3'
										update={(e) => handleCus('name', e)} value={data.cus.name} />
									<PdfInput label='DNI/CIF' name='cusDni' cssLabel='w-1/3' cssInput='w-2/3'
										update={(e) => handleCus('dni', e)} value={data.cus.dni} />
									<PdfInput label='Dirección' name='cusAddress' cssLabel='w-1/3' cssInput='w-2/3'
										update={(e) => handleCus('address', e)} value={data.cus.address} />
									<PdfInput label='Población' name='cusCity' cssLabel='w-1/3' cssInput='w-2/3'
										update={(e) => handleCus('city', e)} value={data.cus.city} />
									<PdfInput label='Provincia' name='cusProvince' cssLabel='w-1/3' cssInput='w-2/3'
										update={(e) => handleCus('province', e)} value={data.cus.province} />
									<PdfInput label='C.P' name='cusCp' type='tel' cssLabel='w-1/3' cssInput='w-2/3'
										update={(e) => handleCus('cp', e)} value={data.cus.cp} />
							</div>
						</div>
					</div>
					{/* products */}
					<Products update={ updateProducts } />
				</div>

				{/* summary */}
				<div className="flex flex-col justify-end pb-8 w-1/2 self-end">
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
										className="text-sm ring-2 ring-gray-100 focus:ring-blue-400 transition duration-300 outline-none rounded block py-1.5 px-3 w-full"
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