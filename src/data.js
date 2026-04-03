const data = {
  name: "Suraj",
  role: "AI + Software Engineer",
  skills: ["Java", "Python", "Machine Learning", "React", "Node.js"],
contact: {
    email: "regisuraj@gmail.com",
    linkedin: "www.linkedin.com/in/suraj-regi",
  },
  projects: [
    {
      name: "Multi-Agent AI Tutor System",
      description:
        "Autonomous multi-agent tutor that personalizes learning in real time. Built at a hackathon — features a Tutor Agent, Student Agent, and Curriculum Agent working in a feedback loop to adapt difficulty, repeat weak topics, and track progress. Maintains memory via JSON/SQLite.",
      tech: ["Python", "Google Gemini", "Streamlit", "Multi-Agent", "SQLite"],
    },
    {
      name: "SIEM Implementation",
      description:
        "Elastic Stack SIEM setup using syslog and winlog beats for log collection. Deployed an Elastic Agent on Windows for monitoring and data gathering. Created custom rules and alerts for threat detection and response.",
      tech: ["Elastic Stack", "SIEM", "Winlogbeat", "Syslog", "Threat Detection"],
    },
  ],
};

export default data;
