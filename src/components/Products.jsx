import React, { useEffect, useState } from 'react'

function Products(props) {
	const [products, setProducts] = useState([{name: "", amount: 0, price: 0, editable: true}]);

	useEffect(() => {
		props.update(products);
	}, [products]);

	const updateProduct = (index, key, value) => {
		setProducts(prev => {
			const newState = prev.map((obj, i) => {
				if (i == index) {
					return {...obj, [key]: value}
				}
				return obj;
			});
			return newState;
		})
	}
	
	const newRow = (index) => {
		updateProduct(index, "editable", false);
		setProducts(prev => [...prev, {name: "", amount: 0, price: 0, editable: true}]);
	}

	const delRow = (index) => {
		let copy = [...products];
		copy.splice(index, 1);
		setProducts(copy);
	}

	const parseSubtotal = (price = 0, amount = 0) => {
		let result = parseInt(price) * parseInt(amount);
		if (isNaN(result)) result = 0;
		return result;
	}

	/** Styles for inputs */
	const inputStyle = "bg-white text-gray-700 text-sm ring-2 ring-gray-100 focus:ring-blue-400 transition duration-300 outline-none rounded mt-1 block py-1.5 px-4 w-full";

  return (
    <div>
			<table className="w-full text-sm text-right">
				<thead className="text-xs text-gray-700 uppercase bg-gray-50">
					<tr>
						<th className="py-3 px-3 text-left w-full min-w-[100px]">Producto</th>
						<th className="py-3 px-3 min-w-[100px]">Cantidad</th>
						<th className="py-3 px-3 min-w-[100px]">Precio</th>
						<th className="py-3 px-3 min-w-[100px]">Subtotal</th>
						<th className="py-3 px-3"></th>
					</tr>
				</thead>
				<tbody>
        {products.map((item, key) => {
          return (
            <tr key={key} className="bg-white border-b">
              <td className="px-2 pb-2 pt-1">
								<input type="text"
									className={inputStyle}
									value={ item.name }
									onChange={(e) => updateProduct(key, "name", e.target.value)} />
							</td>
              <td className="px-2 pb-2 pt-1">
								<input type="phone"
									className={inputStyle + " text-right"}
									value={ (item.amount).toString() }
									onChange={(e) => updateProduct(key, "amount", e.target.value)} />
							</td>
              <td className="px-2 pb-2 pt-1">
								<input type="text"
									className={inputStyle + " text-right"}
									value={ (item.price).toString() }
									onChange={(e) => updateProduct(key, "price", e.target.value)} />
							</td>
              <td className="px-2 pb-2 pt-1">
								<input type="text"
										className={inputStyle + " bg-gray-100 text-right"}
										placeholder={ parseSubtotal(item.price, item.amount) }
										readOnly />
							</td>
              <td className="px-2 pb-2 pt-1">
								<div className="flex items-center justify-center">
									{item.editable &&
										<svg onClick={() => newRow(key) } xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" 
											className="w-6 h-6 hover:text-green-500 cursor-pointer transition duration-300">
											<path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
										</svg>
									}
									{!item.editable &&
										<svg onClick={() => delRow(key) } xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" 
											className="w-6 h-6 text-red-500 hover:text-red-700 cursor-pointer transition duration-300">
											<path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
										</svg>
									}
								</div>
							</td>
            </tr>
          )
        })}
				</tbody>
      </table>
    </div>
  )
}

export default Products