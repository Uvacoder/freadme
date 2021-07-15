handle({request, resolve}) {
  console.log('request.locals: ', request.locals);

  const response = await resolve(request);

  return {
    ...response,
    headers: {
      ...response.headers,
      'x-custom-header': 'blahblah'
    },
  }
}