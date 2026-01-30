import { getStore } from "@netlify/blobs";

export default async (req, context) => {
  const store = getStore({
    name: "validity",
    siteID: context.site.id
  });

  if (req.method === "POST") {
    const body = JSON.parse(req.body || "{}");

    await store.set("dates", {
      from: body.from || "",
      to: body.to || ""
    });

    return new Response(
      JSON.stringify({ ok: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }

  const data = await store.get("dates", { type: "json" }) || {};

  return new Response(
    JSON.stringify(data),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
};

