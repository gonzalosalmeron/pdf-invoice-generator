import React, { useEffect } from 'react'

function PdfInput({label = 'Label', name = '', type = 'text', value, update, cssInput = '', cssLabel = ''}) {
	
	const handleData = (e) => update(e.target.value);

	const inputStyle = "bg-white text-gray-700 text-sm ring-2 ring-gray-100 " + 
		"focus:ring-blue-400 transition duration-300 outline-none rounded mt-1 block py-1.5 px-4";
	const labelStyle = "font-medium text-sm pl-2 -mb-1 text-gray-800";

  return (
    <div className="flex items-baseline gap-4">
        <label htmlFor={ name } className={ labelStyle + " " + cssLabel }>{ label }</label>
        <input id={ name } name={ name } type={ type } 
            value={ value } 
            onChange={ handleData }
            className={ inputStyle + " " + cssInput } />
    </div>
  )
}

export default PdfInput