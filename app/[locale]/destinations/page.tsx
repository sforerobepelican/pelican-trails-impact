// English-route alias: /[locale]/destinations renders the same component as
// /[locale]/destinos. Both URLs are emitted in the sitemap; the canonical
// pair is /es/destinos ↔ /en/destinations (set in generateMetadata).
import DestinationsPage, { generateMetadata as gm } from "../destinos/page";

export const dynamic = "force-static";
export const generateMetadata = gm;
export default DestinationsPage;
