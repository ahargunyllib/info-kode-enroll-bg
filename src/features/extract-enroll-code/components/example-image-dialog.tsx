import Image from 'next/image';
import { Button } from '@/shared/components/ui/button';
import { CardAction } from '@/shared/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog';

export default function ExampleImageDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <CardAction>
          <Button size="sm" variant="outline">
            Contoh Gambar
          </Button>
        </CardAction>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Contoh Gambar Jadwal</DialogTitle>
          <DialogDescription>
            Berikut adalah contoh gambar jadwal yang dapat digunakan untuk
            ekstraksi kode enroll
          </DialogDescription>
        </DialogHeader>
        <div className="h-40 w-full overflow-y-auto rounded-lg border border-border">
          <div className="relative min-h-[800px]">
            <Image
              alt="Contoh Gambar Jadwal"
              className="object-contain"
              fill
              src="/good-example.jpeg"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
