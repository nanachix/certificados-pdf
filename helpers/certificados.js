const pdfmake = require('pdfmake');
const fs = require('fs');

const fonts = {
    Roboto: {
		normal: __dirname + '/../fonts/Roboto/Roboto-Regular.ttf',
		bold: __dirname + '/../fonts/Roboto/Roboto-Medium.ttf',
		italics: __dirname + '/../fonts/Roboto/Roboto-Italic.ttf',
		bolditalics: __dirname + '/../fonts/Roboto/Roboto-MediumItalic.ttf'
    },
    SabonNextLT: {
		normal: __dirname + '/../fonts/SabonNextLT/SabonNextLT.ttf',
		bold: __dirname + '/../fonts/SabonNextLT/SabonNextLTBold.ttf',
		italics: __dirname + '/../fonts/SabonNextLT/SabonNextLTItalic.ttf',
		bolditalics: __dirname + '/../fonts/SabonNextLT/SabonNextLTBoldItalic.ttf'
    },
    AvenirNextLTPro: {
		normal: __dirname + '/../fonts/AvenirNextLTPro/AvenirNextLTPro-Regular.otf',
		bold: __dirname + '/../fonts/AvenirNextLTPro/AvenirNextLTPro-Bold.otf',
		italics: __dirname + '/../fonts/AvenirNextLTPro/AvenirNextLTPro-It.otf',
		bolditalics: __dirname + '/../fonts/AvenirNextLTPro/AvenirNextLTPro-HeavyCnIt.otf'
    }
};

const MAX_TITLE_LENGTH = 87;
const MAX_NAME_LENGTH = 33;

const addNewLines = (n=0) =>{
	let newLines = '';
	for(let i=0;i<n;i++){
		newLines += '\n';
	}
	return newLines;
}

const exportCertificate = (titulo1,titulo2,nombres,horas,fecha) => {
	const saltosAdicionales = 
		(titulo1.length<MAX_TITLE_LENGTH ? 1 : 0) + 
		(titulo2.length<MAX_TITLE_LENGTH ? 1 : 0);

	let printer = new pdfmake(fonts);

	const docDefinition = {
		pageSize: 'A4',
		pageOrientation: 'landscape',
		// [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
		pageMargins: [ 30, 30, 110, 10 ],
		background: function () {
			return {
				canvas: [
					{
						type: 'rect',
						x: 0, y: 0, w: 841.89, h: 595.28,
						color: '#beccc1',
					},				
				],		
			};
		},
		content: [
			'\n',
			{
				alignment: 'center',
				text: 'CERTIFICADO DE PARTICIPACIÓN',
				font: 'AvenirNextLTPro',
				bold: true,
				fontSize: 20,
				color: '#304C32'
			},
			'\n\n',
			{
				alignment: 'center',
				text: 'Otorgado a:',
				font: 'SabonNextLT',
				fontSize: 16
			},
			'\n\n\n',
			{
				alignment: 'center',
				text: nombres,
				font: 'AvenirNextLTPro',
				bold: true,
				fontSize: 34,
				color: '#304C32'
			},	
			'\n\n\n'+addNewLines(nombres.length<MAX_NAME_LENGTH ? 2 : 0),	
			{
				alignment: 'center',
				text: 'Por participar en el:',
				font: 'SabonNextLT',
				fontSize: 16
			},
			'\n',	
			{
				alignment: 'center',
				text: titulo1,
				font: 'SabonNextLT',
				bold: true,
				fontSize: 16
			},
			{
				alignment: 'center',
				text: titulo2,
				font: 'SabonNextLT',
				bold: true,
				fontSize: 16
			},
			'\n',	
			{
				alignment: 'center',
				text: horas,
				font: 'SabonNextLT',
				bold: true,
				fontSize: 11
			},
			addNewLines(saltosAdicionales),
			{
				image: 'G:\\Usuarios\\Ricardo\\OneDrive\\Imágenes\\FirmaGuisselaCertificados.png',
				width: 180,
				height: 100,
				relativePosition: {
					x: 500,
					y: 0,
				}
			},
			'\n\n\n\n\n',
			{
				columns :[
					{
						alignment: 'left',
						text: fecha,
						font: 'SabonNextLT',					
						fontSize: 14,					
					},
					{
						text: ''
					},
					{
						alignment: 'center',
						text: '______________________________\nGuíssela Guerrero Peralta\nAbogada',
						font: 'SabonNextLT',					
						fontSize: 13,
						bold: true,
						color: '#576E5C',
					},
				]
			},
			{
				columns :[
					{
						text: '\n',
					},
					{
						text: '\n'
					},
					{
						alignment: 'center',
						text: 'Especializada en Derecho Laboral y SST',
						font: 'SabonNextLT',					
						fontSize: 10,
						bold: true,
						color: '#576E5C',
					},
				]
			},			
			{
				image: __dirname +'/../images/barra.png',
				width: 100,
				height: 595.28,
				absolutePosition: {x: 741, y: 0}
			},		
	]
	};
	
	let pdfDoc = printer.createPdfKitDocument(docDefinition);
	pdfDoc.pipe(fs.createWriteStream(__dirname +`/../pdfs/${nombres}.pdf`));
	pdfDoc.end();
}


module.exports  = {
    exportCertificate
}