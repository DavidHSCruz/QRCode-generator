import { QRCodeCanvas } from "qrcode.react"
import { QRCodeType } from "../../types/QRCodeType"

export default function QRCodeList({ qrCodes }: { qrCodes: QRCodeType[] }) {
  if (qrCodes.length === 0) {
    return <p className="text-gray-500">Nenhum QR Code gerado ainda.</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {qrCodes.map(({ id, titulo, value }) => (
        <div key={id} className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md">
          <p className="font-semibold mb-2 text-center">{titulo}</p>
          <QRCodeCanvas value={value} size={100} />
        </div>
      ))}
    </div>
  );
}
