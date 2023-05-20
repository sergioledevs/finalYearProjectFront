import styled from 'styled-components';

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  height: 70%;
`;

export const Heading = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const Section = styled.section`
  margin-bottom: 20px;
`;

export const Subheading = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
`;

export const Paragraph = styled.p`
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 10px;
`;

export const Link = styled.a`
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;