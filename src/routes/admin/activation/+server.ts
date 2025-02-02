//import { hash } from 'bcryptjs';
import jwt from 'jsonwebtoken'  // Use JWT for generating tokens
import { sendEmail } from '$lib/helper/sendEmail'  // A custom function to send emails
import db from '$lib/database.js'

const JWT_SECRET = 'your-secret-key';  // Store this securely in environment variables

export async function POST({ request }) {

    const data = await request.formData();
        const email = data.get('email') as string | null;


  // Validate email
  if (!email) {
    return new Response(JSON.stringify({ message: 'Email is required' }), { status: 400 });
  }


  const existingUser = await db.user.findUnique({ where: { email } });
  if (existingUser) {
    return new Response(JSON.stringify({ message: 'Email is already taken' }), { status: 400 });
  }

  // Generate token for email verification
  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
  // Send email with token link
  const link = `http://localhost:5173/api/activation?token=${token}`;

try {
  await sendEmail({
    to: email,
    subject: 'Witaj w Learnt 2 Trade Pro',
    html: ` <table style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #2b373d; border-collapse: collapse;">
        <tr>
            <td style="background-color: #c81e1e; padding: 20px; text-align: center;">
                <h1 style="color: #ffffff; font-size: 24px; margin: 0;">Witaj w naszej ekskluzywnej społeczności!</h1>
            </td>
        </tr>
        <tr>
            <td style="padding: 20px;">
                <p style="color: #ffffff; font-size: 16px; line-height: 1.5;">
                    Drogi [Imię],
                </p>
                <p style="color: #ffffff; font-size: 16px; line-height: 1.5;">
                    Dziękujemy za dołączenie do naszej platformy. To pierwszy krok w kierunku osiągnięcia Twoich finansowych celów. Jesteśmy tutaj, aby Cię wspierać na każdym etapie Twojej podróży.
                </p>
                <p style="color: #ffffff; font-size: 16px; line-height: 1.5;">
                    Kliknij poniższy przycisk, aby zalogować się do platformy i rozpocząć swoją przygodę:
                </p>
                <div style="text-align: center; margin: 20px 0;">
                    <a href="${link}" style="display: inline-block; background-color: #c81e1e; color: #1f2937; text-decoration: none; font-weight: bold; padding: 12px 24px; border-radius: 5px;">Przejdź do platformy</a>
                </div>
                <p style="color: #ffffff; font-size: 16px; line-height: 1.5;">
                    Jeśli masz jakiekolwiek pytania lub potrzebujesz pomocy, skontaktuj się z nami, odpowiadając na tę wiadomość.
                </p>
                <p style="color: #ffffff; font-size: 16px; line-height: 1.5;">
                    Pozdrawiamy,<br>
                    Zespół [Twoja Nazwa]
                </p>
            </td>
        </tr>
        <tr>
            <td style="background-color: #c81e1e; padding: 10px; text-align: center;">
                <p style="color: #ffffff; font-size: 12px; margin: 0;">
                    &copy; 2025 [Twoja Nazwa]. Wszystkie prawa zastrzeżone.
                </p>
            </td>
        </tr>
    </table>`,
  });

  // If email is sent successfully, create the user in the database
  await db.user.create({
    data: {
      email: email,
      password: "",
      active: 'pending',
    },
  });

  return new Response(JSON.stringify({ message: 'Check your email for the activation link' }), { status: 200 });

} catch (error) {
    // Handle errors for either email sending or user creation
    console.error('Failed to send email or create user:', error);
    throw error; // Re-throw the error if needed
  }
}