
export const prerender = true;
export const load = async ({ locals }) => {
    return {
      user: locals.user || null, // Pass user info to the layout
    };
  };
