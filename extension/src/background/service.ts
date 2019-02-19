export async function fetchRandomUser() {
  const userUrl = 'http://jsonplaceholder.typicode.com/users';
  console.log(userUrl);

  const userResponse = await fetch(userUrl);
  const users = await userResponse.json();
  const randomUser = await users[Math.floor(Math.random() * users.length)];
  console.log(randomUser);

  return randomUser;
}
