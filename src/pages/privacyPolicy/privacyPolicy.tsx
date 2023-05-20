import { useState } from "react";
import RegistrationForm from "../register/register";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import {
  Form,
  Label,
  Input,
  Button,
  RegisterButton,
  BigDiv,
} from "../logIn/logIn.style";
import NavBar from "../../components/navBar/navBar";
import { BackButton, StyledButton } from "../profile/profile.styles";
import { GradientButton } from "../landingPage/landing.style";
import { Container, Heading, Section, Subheading, Paragraph, Link } from "./privacyPolicy.style";
import Footer from "../../components/footer/footer";

function PrivacyPolicy() {
  return (
    <BigDiv>
      <NavBar></NavBar>
      <Container>
      <Heading>CUKFIT Privacy policy</Heading>
      <Section>
        <Subheading>1. Information We Collect:</Subheading>
        <Paragraph>
          When you use CUKFIT, we may collect the following types of information:
        </Paragraph>
        <Paragraph>
          <strong>1.1 Personal Information:</strong>
          We collect your email address, height, weight, age, gender, and fitness goal to personalize and optimize your experience within the app.
        </Paragraph>
      </Section>
      <Section>
        <Subheading>2. Use of Information:</Subheading>
        <Paragraph>
          We use the information collected for the following purposes:
        </Paragraph>
        <Paragraph>
          <strong>2.1 Personalization and Improvements:</strong>
          The data you provide allows us to customize your experience and offer personalized recommendations, content, and services to help you achieve your fitness goals.
        </Paragraph>
        <Paragraph>
          <strong>2.2 Communication:</strong>
          We may use your email address to send important updates, notifications, and relevant information about CUKFIT, including new features, product announcements, and promotional offers. You have the option to unsubscribe from these communications at any time.
        </Paragraph>
        <Paragraph>
          <strong>2.3 Internal Operations:</strong>
          We may use the collected data for internal purposes, such as data analysis, research, and improving the functionality and performance of our web application. This may include troubleshooting, data security, and ensuring compliance with our policies and terms of service.
        </Paragraph>
      </Section>

      <Section>
        <Subheading>3. Data Security:</Subheading>
        <Paragraph>
          We are committed to ensuring the security of your personal information. We implement appropriate technical and organizational measures to protect against unauthorized access, alteration, disclosure, or destruction of your data.
        </Paragraph>
      </Section>

      <Section>
        <Subheading>4. Data Retention:</Subheading>
        <Paragraph>
          We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
        </Paragraph>
      </Section>

      <Section>
        <Subheading>5. Third-Party Sharing:</Subheading>
        <Paragraph>
          We do not sell, trade, or otherwise transfer your personal information to third parties. Your data will be used solely for the purposes outlined in this Privacy Policy and to provide you with the best possible experience within CUKFIT.
        </Paragraph>
      </Section>

      <Section>
        <Subheading>6. Your Choices and Rights:</Subheading>
        <Paragraph>
          You have certain rights regarding your personal information, including the right to access, update, correct, or delete your data. You can also choose to disable or delete your account at any time. To exercise these rights or for any privacy-related inquiries, please contact us using the information provided below.
        </Paragraph>
      </Section>

      <Section>
        <Subheading>7. Changes to the Privacy Policy:</Subheading>
        <Paragraph>
          We reserve the right to update or modify this Privacy Policy from time to time. Any changes will be posted on this page with the updated effectivedate. We encourage you to review this policy periodically for any updates.
          </Paragraph>
          </Section>
      {/* ... Rest of the sections ... */}
      <Section>
        <Subheading>8. Contact Us:</Subheading>
        <Paragraph>
          If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at{' '}
          <Link href="">sgg507@york.ac.uk</Link>.
        </Paragraph>
      </Section>
      <Paragraph>
        By using CUKFIT, you agree to the terms and conditions outlined in this Privacy Policy.
      </Paragraph>
      <Paragraph>Last updated: [Date]</Paragraph>
    </Container>
    </BigDiv>
  );
}

export default PrivacyPolicy;
