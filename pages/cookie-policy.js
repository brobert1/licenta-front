import { Header, Footer } from '@components/Visitor';

const Page = () => {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <div className="max-visitor w-full flex items-center py-12 px-3">
        <article className="prose prose-h1:text-2xl prose-h2:text-xl prose-p:text-md max-w-full">
          <h1>Cookie Policy</h1>
          <h2>1. Introduction</h2>
          <p>
            Cookies are small files saved on your device when you visit websites. They play crucial
            roles in improving your online experience. Our cookie policy explains the nature,
            purpose, and management of the cookies we use.
          </p>
          <h2>2. What are Cookies?</h2>
          <p>
            Cookies are tiny text files stored on your device (computer, mobile, or tablet) when you
            browse the internet. They help websites remember your preferences, making your online
            interactions smoother and more personalized.
          </p>
          <h2>3. Why We Use Cookies</h2>
          <p>
            We utilize cookies to enhance functionality, improve the performance of our website, and
            gather analytical data to understand better how visitors engage with our site.
          </p>
          <h2>4. Types of Cookies We Use</h2>
          <ul>
            <li>
              Essential Cookies: These are necessary for the proper functioning of our website. They
              enable basic features like page navigation and access to secure areas.
            </li>
            <li>Performance Cookies:</li>
            <ul>
              <li>
                Purpose: These cookies help us understand the performance and efficiency of our
                website. They gather information about how users interact with the site, such as
                page load times or error messages, ensuring our website functions correctly and
                highlighting areas for improvement.
              </li>
              <li>
                Anonymity: The data collected is aggregated and anonymous, emphasizing website
                functionality.
              </li>
            </ul>
            <li>Analytics Cookies:</li>
            <ul>
              <li>
                Purpose: Analytics cookies track user behavior. They help us comprehend user
                interactions and activities, such as which pages they visit most or the navigation
                paths they take.
              </li>
              <li>
                Anonymity: While these cookies offer more detailed insights into user patterns, the
                data is typically anonymized to respect user privacy.
              </li>
            </ul>
          </ul>
          <h2>5. Third-Party Cookies</h2>
          <p>
            For Performance and Analytics purposes, we may utilize third-party cookies. Notably:
          </p>
          <ul>
            <li>
              Google Analytics: Helps us understand user behavior by providing insights into website
              interactions.
            </li>
            <li>Vimeo: Enhances video playback features and captures viewer metrics.</li>
            <li>
              DataDog: Monitors website performance and user experiences, ensuring our site operates
              seamlessly.
            </li>
          </ul>
          <h2>6. Managing Your Cookies</h2>
          <ul>
            <li>On This Page: You can adjust your cookie preferences with the toggles below.</li>
            <li>
              Pop-up Cookie Banner: Upon your first visit, our cookie banner pops up, allowing you
              to set your preferences.
            </li>
            <li>
              Browser Settings: You can manage or refuse cookies by altering your browser settings.
              However, blocking all cookies might impact your ability to fully experience our
              website. Some site features may become unavailable if necessary cookies are denied.
            </li>
          </ul>
          <h2>7. External Organizations and Cookies</h2>
          <p>
            Be aware that external organizations, such as advertising networks, might also use
            cookies to track you across different websites. Unfortunately, we have no control over
            these cookies, and you might want to check the respective policies of these external
            services for further details.
          </p>
          <h2>Contact Information</h2>
          <p>
            By using our website, you're acknowledging our use of cookies as described in this
            policy. If you have any questions or concerns regarding our cookie usage, feel free to
            reach out to us.
          </p>
        </article>
      </div>
      <Footer />
    </main>
  );
};

export default Page;
