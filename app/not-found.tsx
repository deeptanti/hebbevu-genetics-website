import { PageHero } from "@/components/layout/PageHero";
import { Button, ButtonGroup } from "@/components/ui";

export default function NotFound() {
  return (
    <PageHero
      title="We couldn’t find that page"
      lede="It may have moved when we reorganised the site."
      actions={
        <ButtonGroup>
          <Button href="/">Go to the home page</Button>
          <Button href="/contact" variant="secondary">
            Contact us
          </Button>
        </ButtonGroup>
      }
    />
  );
}
