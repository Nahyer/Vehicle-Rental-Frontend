import React from 'react';

const UserLogin = () => {
  return (
    <form action="/login" method="post" className="space-y-4">
      <div className="flex flex-col">
        <label for="email" className="text-sm font-medium mb-2">Email Address</label>
        <input type="email" name="email" id="email" className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" required />
      </div>
      <div className="flex flex-col">
        <label for="password" className="text-sm font-medium mb-2">Password</label>
        <input type="password" name="password" id="password" className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" required />
      </div>
      <div className="flex items-center justify-between">
        <a href="#" className="text-sm text-blue-500 hover:underline">Forgot Password?</a>
        <button type="submit" className="px-4 py-2 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-700">Login</button>
      </div>
    </form>
  );
};

export default UserLogin;
