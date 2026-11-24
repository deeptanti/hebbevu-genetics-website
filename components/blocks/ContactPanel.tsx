import { contact } from "@/content/site";
import { Button, ButtonGroup } from "../ui/Button";
import { BrandIcon } from "../ui/BrandIcon";
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
        <div className="flex items-start gap-4">
          <BrandIcon name="mail" size="sm" />
          <div className="flex flex-col gap-1">
          <dt className="type-label text-graphite">Email</dt>
          <dd>
            <a href={contact.emailHref} className="transition-ui type-body text-brown underline underline-offset-4 hover:text-brown-dark">
              {contact.email}
            </a>
          </dd>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <BrandIcon name="phone" size="sm" />
          <div className="flex flex-col gap-1">
          <dt className="type-label text-graphite">Phone</dt>
          <dd>
            <a href={contact.phoneHref} className="transition-ui type-body text-brown underline underline-offset-4 hover:text-brown-dark">
              {contact.phoneDisplay}
            </a>
          </dd>
          </div>
        </div>
        {showAddress && (
          <div className="flex items-start gap-4 sm:col-span-2">
            <BrandIcon name="pin" size="sm" />
            <div className="flex flex-col gap-1">
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
          </div>
        )}
      </dl>
    </div>
  );
}
