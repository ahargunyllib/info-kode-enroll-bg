import { Button } from '@/shared/components/ui/button';
import { CardAction } from '@/shared/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/components/ui/dialog';
import Image from 'next/image';

export default function ExampleImageDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <CardAction>
          <Button variant="outline" size="sm">
            Contoh Gambar
          </Button>
        </CardAction>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>
            Contoh Gambar Jadwal
          </DialogTitle>
          <DialogDescription>
            Berikut adalah contoh gambar jadwal yang dapat digunakan untuk ekstraksi kode enroll
          </DialogDescription>
        </DialogHeader>
        <div className="h-40 w-full overflow-y-auto border border-border rounded-lg">
          <div className="relative min-h-[800px]">
            <Image
              src="/good-example.jpeg"
              alt="Contoh Gambar Jadwal"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
