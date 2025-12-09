"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function DownloadModal({ data }: { data: any }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Download</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Available Downloads</DialogTitle>
          <DialogDescription>
            Choose a quality below. Dub/Sub detection is automatic.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-3 mt-4">
          {data.downloads.map((d: any) => {
            const isDub =
              d.quality.toLowerCase().includes("eng") ||
              d.quality.toLowerCase().includes("dub");

            const label = `${d.quality} ${isDub ? "(Dub)" : "(Sub)"}`;

            return (
              <Button
                key={d.quality + d.download}
                variant="outline"
                onClick={() => window.open(d.download, "_blank")}
              >
                {label}
              </Button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
