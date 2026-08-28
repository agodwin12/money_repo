import { setRequestLocale } from "next-intl/server";
import { Mail, Phone } from "lucide-react";
import { getContactMessages } from "@/db/queries";

export const dynamic = "force-dynamic";

export default async function AdminMessages({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getContactMessages();

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-foreground">Messages</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {messages.length} contact form {messages.length === 1 ? "submission" : "submissions"}.
      </p>

      {messages.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
          No messages yet.
        </p>
      ) : (
        <div className="mt-6 flex flex-col gap-4">
          {messages.map((m) => (
            <div key={m.id} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-foreground">
                    {m.firstName} {m.lastName ?? ""}
                  </p>
                  <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    <a
                      href={`mailto:${m.email}`}
                      className="inline-flex items-center gap-1.5 hover:text-primary"
                    >
                      <Mail className="h-3.5 w-3.5" /> {m.email}
                    </a>
                    {m.phone && (
                      <span className="inline-flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5" /> {m.phone}
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(m.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="mt-3 whitespace-pre-wrap border-t border-border pt-3 text-sm text-foreground">
                {m.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
