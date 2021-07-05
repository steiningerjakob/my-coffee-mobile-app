import { apiBaseUrl } from './apiBaseUrl';

export async function logoutUser() {
  await fetch(`${apiBaseUrl}/users/logout`);
}

export async function getBeans() {
  const response = await fetch(`${apiBaseUrl}/products/beans`);
  const beans = await response.json();
  return beans;
}

export async function getFilteredBeans(query) {
  const response = await fetch(`${apiBaseUrl}/products/query`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: query,
    }),
  });
  const data = await response.json();
  return data;
}

export async function getMachines() {
  const response = await fetch(`${apiBaseUrl}/products/machines`);
  const machines = await response.json();
  return machines;
}

export async function getGrinders() {
  const response = await fetch(`${apiBaseUrl}/products/grinders`);
  const grinders = await response.json();
  return grinders;
}

export async function getFlavourProfile(beanId) {
  const response = await fetch(`${apiBaseUrl}/products/flavour`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: beanId,
    }),
  });

  const flavour = await response.json();
  return flavour;
}

export async function checkFavouriteStatus(userId, beanId) {
  const response = await fetch(`${apiBaseUrl}/actions/favourite_status`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: userId,
      beanId: beanId,
    }),
  });

  const data = await response.json();
  if (data.data) {
    return true;
  } else {
    return false;
  }
}

export async function addBeansToFavourites(firstName, userId, beanId) {
  if (firstName === '') {
    alert('You need to sign in to perform this action');
  } else {
    const response = await fetch(`${apiBaseUrl}/actions/add_favourite`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId,
        beanId: beanId,
      }),
    });

    const data = await response.json();
    if (data.message) {
      alert(data.message);
    } else {
      alert('Oops.. something went wrong');
    }
  }
}

export async function removeBeansFromFavourites(userId, beanId) {
  const response = await fetch(`${apiBaseUrl}/actions/remove_favourite`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: userId,
      beanId: beanId,
    }),
  });

  const data = await response.json();
  if (data.message) {
    alert(data.message);
  } else {
    alert('Oops.. something went wrong');
  }
}

export async function getUserFavourites(id) {
  const response = await fetch(`${apiBaseUrl}/actions/get_favourites`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: id,
    }),
  });

  const favourites = await response.json();
  return favourites;
}

export async function insertReview(userId, beanId, rating, review) {
  const response = await fetch(`${apiBaseUrl}/actions/insert_review`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: userId,
      beanId: beanId,
      rating: rating,
      review: review,
    }),
  });

  const data = await response.json();
  if (data.message) {
    alert(data.message);
  } else {
    alert('Oops.. something went wrong');
  }
}

export async function checkReviewStatus(userId, beanId) {
  const response = await fetch(`${apiBaseUrl}/actions/review_status`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: userId,
      beanId: beanId,
    }),
  });

  const data = await response.json();
  if (data.userEntry) {
    return data.userEntry;
  } else {
    return false;
  }
}

export async function updateReview(userId, beanId, rating, review) {
  const response = await fetch(`${apiBaseUrl}/actions/update_review`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: userId,
      beanId: beanId,
      rating: rating,
      review: review,
    }),
  });

  const data = await response.json();
  if (data.message) {
    alert(data.message);
  } else {
    alert('Oops.. something went wrong');
  }
}

export async function updateProfileImage(id, profileImage) {
  console.log('frontend function id', id);
  const response = await fetch(`${apiBaseUrl}/actions/update_profile_image`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: id,
      profileImage: profileImage,
    }),
  });

  const data = await response.json();
  if (data.message) {
    alert(data.message);
  } else {
    alert('Oops.. something went wrong');
  }
}

export async function checkProfileImageStatus(id) {
  const response = await fetch(`${apiBaseUrl}/actions/profile_image_status`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: id,
    }),
  });

  const data = await response.json();
  if (data.profileImage) {
    return data.profileImage;
  } else {
    return false;
  }
}

export async function insertSetup(userId, machineId, grinderId) {
  const response = await fetch(`${apiBaseUrl}/actions/insert_setup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: userId,
      machineId: machineId,
      grinderId: grinderId,
    }),
  });

  const data = await response.json();
  if (data.message) {
    alert(data.message);
  } else {
    alert('Oops.. something went wrong');
  }
}

export async function removeFromSetups(setupId) {
  const response = await fetch(`${apiBaseUrl}/actions/remove_setup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      setupId: setupId,
    }),
  });

  const data = await response.json();
  if (data.message) {
    alert(data.message);
  } else {
    alert('Oops.. something went wrong');
  }
}

export async function getUserSetups(id) {
  const response = await fetch(`${apiBaseUrl}/actions/get_setups`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: id,
    }),
  });

  const setups = await response.json();
  return setups;
}
