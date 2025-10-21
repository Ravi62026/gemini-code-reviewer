export const LANGUAGES = [
  { value: 'javascript', label: 'JavaScript', fileExtension: '.js' },
  { value: 'typescript', label: 'TypeScript', fileExtension: '.ts' },
  { value: 'python', label: 'Python', fileExtension: '.py' },
  { value: 'java', label: 'Java', fileExtension: '.java' },
  { value: 'csharp', label: 'C#', fileExtension: '.cs' },
  { value: 'go', label: 'Go', fileExtension: '.go' },
  { value: 'rust', label: 'Rust', fileExtension: '.rs' },
  { value: 'ruby', label: 'Ruby', fileExtension: '.rb' },
  { value: 'html', label: 'HTML', fileExtension: '.html' },
  { value: 'css', label: 'CSS', fileExtension: '.css' },
  { value: 'sql', label: 'SQL', fileExtension: '.sql' },
  { value: 'php', label: 'PHP', fileExtension: '.php' },
  { value: 'cpp', label: 'C++', fileExtension: '.cpp' },
  { value: 'c', label: 'C', fileExtension: '.c' },
  { value: 'json', label: 'JSON', fileExtension: '.json' },
  { value: 'xml', label: 'XML', fileExtension: '.xml' },
  { value: 'yaml', label: 'YAML', fileExtension: '.yaml' },
];

export const DEFAULT_CODE_SNIPPET = `// Modern JavaScript with async/await
async function fetchUserData(userId) {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    const userData = await response.json();
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    // Process user data
    const processedData = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      lastLogin: new Date(userData.lastLogin),
      isActive: userData.status === 'active'
    };
    
    return processedData;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    return null;
  }
}

// Usage example
fetchUserData(123).then(user => {
  if (user) {
    console.log(\`Welcome back, \${user.name}!\`);
  }
});`;