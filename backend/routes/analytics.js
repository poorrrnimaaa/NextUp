router.get("/summary", async (req, res) => {
  const total = await Token.countDocuments();
  const completed = await Token.countDocuments({ status: "COMPLETED" });

  res.json({
    totalTokens: total,
    completedTokens: completed
  });
});
