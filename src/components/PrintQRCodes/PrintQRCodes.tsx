import { forwardRef } from "react"
import { QRCodeCanvas } from "qrcode.react"
import { QRCodeType } from "../../types/QRCodeType"

interface PrintQRCodeProps {
  QRCodes: QRCodeType[]
}

// Usamos forwardRef para referenciar esse componente na impressão
export const PrintQRCodes = forwardRef<HTMLDivElement, PrintQRCodeProps>(({ QRCodes }, ref) => {
  return (
    <div ref={ref} className="p-6 bg-white">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {QRCodes.map(({ id, titulo, value }) => (
          <div key={id} className="p-14 flex flex-col items-center text-center">
            <p className="text-2xl font-semibold mb-2">{titulo}</p>
            <QRCodeCanvas value={value} size={200} />
          </div>
        ))}
      </div>
    </div>
  )
})
