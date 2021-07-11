module.exports = {
  client: {
    includes: ["src/**/*.{ts,tsx}"],
    service: {
      name: "hello-world",
      tagName: "gql",
      localSchemaFile: ["./client-schema.gql"],
      passthroughCustomScalars: false
    },
  },
};
