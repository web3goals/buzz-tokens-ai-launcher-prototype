async function main() {
  console.log("👟 Script started");

  console.log("🏁 Script finished");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
