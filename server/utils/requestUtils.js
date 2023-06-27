const sendJson = (res, data = '', status = 200) => {
	if (!res) {
		throw new Error('res is required')
	}

  if(!data && !status) {
    res.sendStatus(500)
    return
  }

	const formatData =
		typeof data === 'string'
			? {
					message: data,
			  }
			: data

  res.status(status).send(formatData)
}


module.exports = {
  sendJson
}