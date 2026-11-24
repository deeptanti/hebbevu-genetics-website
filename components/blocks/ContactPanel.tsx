import { contact } from "@/content/site";
import { Button, ButtonGroup } from "../ui/Button";
import { Icon } from "../ui/Icon";

/** Phone-first contact block with WhatsApp (brief §14). */
export function ContactPanel({ showAddress = true }: { showAddress?: boolean }) {
  return (
    <div className="flex flex-col gap-5">
      <ButtonGroup>
        <Button href={contact.phoneHref} variant="secondary" icon={<Icon name="phone" />}>
          Call {contact.phoneDisplay}
        </Button>
        <Button href={contact.whatsappHref} variant="secondary" icon={<Icon name="whatsapp" />}>
          WhatsApp us
        </Button>
      </ButtonGroup>
      <dl className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <dt className="type-label text-graphite">Email</dt>
          <dd>
            <a href={contact.emailHref} className="transition-ui type-body text-brown underline underline-offset-4 hover:text-brown-dark">
              {contact.email}
            </a>
          </dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className="type-label text-graphite">Phone</dt>
          <dd>
            <a href={contact.phoneHref} className="transition-ui type-body text-brown underline underline-offset-4 hover:text-brown-dark">
              {contact.phoneDisplay}
            </a>
          </dd>
        </div>
        {showAddress && (
          <div className="flex flex-col gap-1 sm:col-span-2">
            <dt className="type-label text-graphite">Reynadu Farm & Lab</dt>
            <dd className="type-body text-ink">
              <address className="not-italic">
                {contact.addressLines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </address>
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
}
