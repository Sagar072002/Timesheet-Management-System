import React from 'react'

const Contact = () => {
  return (
    <section className="bg-white m-6 mt-10 pt-10">
  <div className="py-3 lg:py-5 px-5 mx-auto max-w-[500px] border rounded-md">
    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 ">
      Contact Me
    </h2>
   
    <form action="#" className="space-y-8">
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder="Your Email"
          required=""
        />
      </div>
      <div>
        <label
          htmlFor="subject"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Subject
        </label>
        <input
          type="text"
          id="subject"
          className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 "
          placeholder="Let us know how we can help you"
          required=""
        />
      </div>
      <div className="sm:col-span-2">
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Your message
        </label>
        <textarea
          id="message"
          rows={6}

          className="block resize-none p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
          placeholder="Leave a comment..."
          defaultValue={""}
        />
      </div>
      <button
        type="submit"
        className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-blue-700 sm:w-fit hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
      >
        Send message
      </button>
    </form>
  </div>
</section>

  )
}

export default Contact