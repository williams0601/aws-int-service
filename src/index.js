module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Received successfully",
        input: event,
      },
      null,
      2
    ),
  };
};
