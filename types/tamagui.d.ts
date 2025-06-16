// Type declarations for Tamagui CSS imports
declare module '*.css' {
  const content: any;
  export default content;
}

// Specifically for tamagui-web.css
declare module '../tamagui-web.css' {
  const content: any;
  export default content;
} 