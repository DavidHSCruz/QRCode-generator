import { useState, useRef } from "react"
import { useReactToPrint } from "react-to-print"
import QRCodeList from "../QRCodeList/QRCodeList"
import { QRCodeType } from "../../types/QRCodeType"
import { PrintQRCodes } from "../PrintQRCodes/PrintQRCodes"

export const QRCodeGenerator = () => {
  const [QRCodeValue, setQRCodeValue] = useState<QRCodeType>({ id: '', titulo: '', value: '' })
  const [qrCodes, setQrCodes] = useState<QRCodeType[]>([])

  const printRef = useRef<HTMLDivElement>(null)
  const handlePrint = useReactToPrint({
    documentTitle: "QRCode",
  })
  function reactToPrintContent() {
    return printRef.current
  }

  function generateQRCode() {
    const titulo = QRCodeValue.titulo
    const value = QRCodeValue.value.trim()
    if (!value || !titulo) return

    // Verifica se já existe o mesmo QR Code
    const existingQRCode = qrCodes.find((item) => item.value === value)
    if (existingQRCode) return

    setQrCodes((prev) => [...prev, { id: crypto.randomUUID(), titulo: titulo, value: value }])
    setQRCodeValue({ id: '', titulo: '', value: '' }) // Limpa o input
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setQRCodeValue({ 
      ...QRCodeValue, 
      [name]: value 
    })
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Gerador de QR Code</h1>

      <div className="flex flex-col gap-2 mb-6 w-full max-w-md">
        <input
          name="titulo"
          type="text"
          value={QRCodeValue.titulo}
          onChange={handleChange}
          placeholder="Título do QR Code..."
          className="w-full border p-2 rounded-md shadow-md focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <input
          name="value"
          type="text"
          value={QRCodeValue.value}
          onChange={handleChange}
          placeholder="Valor do QR Code..."
          className="w-full border p-2 rounded-md shadow-md focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button
          onClick={generateQRCode}
          className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition"
        >
          Gerar
        </button>
        <button
          onClick={() => handlePrint(reactToPrintContent)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition"
        >
          Imprimir
        </button>
      </div>

      <QRCodeList qrCodes={qrCodes} />

      {/* Componente para impressão (pode ficar oculto) */}
      <div className="hidden">
        <PrintQRCodes ref={printRef} QRCodes={qrCodes} />
      </div>
    </div>
  )
}
