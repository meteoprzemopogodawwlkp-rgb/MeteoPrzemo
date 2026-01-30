import { getStore } from "@netlify/blobs";

export default async (req, context) => {
  const store = getStore("validity", {
    siteID: context.site.id
  });

  if (req.method === "POST") {
    const body = JSON.parse(req.body || "{}");

    await store.set("from", body.from || "");
    await store.set("to", body.to || "");

    return new Response(
      JSON.stringify({ ok: true }),
      { status: 200 }
    );
  }

  const from = await store.get("from");
  const to = await store.get("to");

  return new Response(
    JSON.stringify({ from, to }),
    { status: 200 }
  );
};
