

// this is the main page of the application which includes all the information
//from buttons to video and the whole content of the page is here
import Footer from "@/components/footer";
import Link from "next/link";
import "./page.css";
export default function Home(){
  return(
    <><main className="home-page">
     <section className="heading-main">
  <h1>Welcome to CheckedIn</h1>

  <div className="moving-text">
    <p>
      A smart attendance management system designed to simplify check-ins with modern technology
      Our platform works with a seamless, automated ecosystem
      It not only tracks presence but enhances workflows and delivers real-time insights for better decision-making
    </p>
  </div>

  <Link href="/register">
    <button className="get-started-button">Let's Get Started</button>
  </Link>

  <Link href="/about">
    <button className="get-started-button">About Us</button>
  </Link>

</section>

      <div className="team">
  <video autoPlay muted loop playsInline preload="metadata">
    <source src="/smartteamsforcheckedin.mp4" type="video/mp4" />
  </video>
</div>

    


      <div className="role-card">

        <div className="role-item">
          <img src="/staff.jpg" alt="Staff" />



          <h3>For Staff</h3>
          <p> Staff members can securely log in using their  credentials to record their check-in, ensuring accurate attendance tracking and a seamless start to their workday</p>
                    <button className="get-started-button">
  <Link href="/staff" className="btn-link">
    <span>Staff Login</span>
  </Link>
</button>
         
          
        </div>

        <div className="role-item">
          <img src="/manager-girl.jpg" alt="Manager" />
          <h3>For Managers</h3>
          <p> Managers can instantly review employee check-ins and approve working hours with complete confidence
       
            
          </p>
          <button className="get-started-button">
  <Link href="/manager" className="btn-link">
    <span>Manager Login</span>
  </Link>
</button>
        </div>

      </div>

      <div className="simple-image">
        <img src="/Home.png" alt="home" />

      </div>



        <section className="features">
  <h2>Why CheckedIn?</h2>

  <div className="features-grid">

    <div className="feature-card">
      <h3>Real-Time Tracking</h3>
      <p>Monitor attendance instantly with a reliable  system</p>
    </div>

    <div className="feature-card">
      <h3>Secure Access</h3>
      <p>Staff can safely log in using their credentials to record attendance</p>
    </div>

    <div className="feature-card">
      <h3>Manager Control</h3>
      <p>Managers can review check-ins and manage team attendance efficiently</p>
    </div>

   

  </div>
   

      

      


      
</section>
<div className="video-healthy">
  <video autoPlay muted loop playsInline preload="metadata">
    <source src="/benefits.mp4" type="video/mp4" />
  </video>
</div>

     
      <div className="faqs">
  <h2>Frequently Asked Questions</h2>

  <div className="faq-item">
    <h3>How does CheckedIn help recognize hard work?</h3>
    <p>
      By accurately recording check-ins, work hours, and activity logs,
      CheckedIn ensures that employees receive proper visibility for the
      time and effort they contribute
    </p>
  </div>

  <div className="faq-item">
    <h3>Is the system secure?</h3>
    <p>
      Yes. CheckedIn uses secure authentication and data management practices
      to ensure that employee information and attendance records are protected
    </p>
  </div>

  <div className="faq-item">
    <h3>Can managers approve working hours?</h3>
    <p>
      Yes. Managers can review employee check-ins and approve or manage
      recorded working hours directly through the manager dashboard
    </p>
  </div>

 <div className="video-healthy">
  <video autoPlay muted loop playsInline preload="metadata">
    <source src="/simple.mp4" type="video/mp4" />
  </video>
</div>
</div>








        
    </main>
    <Footer />
    </>
  )
}