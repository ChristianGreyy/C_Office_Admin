const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@interfaces": path.resolve(__dirname, "./src/interfaces"),
      "@api": path.resolve(__dirname, "./src/api"),
      "@layouts": path.resolve(__dirname, "./src/layouts"),
      "@redux": path.resolve(__dirname, "./src/redux"),
      "@configs": path.resolve(__dirname, "./src/configs"),
      "@modules": path.resolve(__dirname, "./src/modules"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@translations": path.resolve(__dirname, "./src/translations"),
      "@validations": path.resolve(__dirname, "./src/validations"),
      "@routes": path.resolve(__dirname, "./src/routes"),
      "@service": path.resolve(__dirname, "./src/service"),
      "@theme": path.resolve(__dirname, "./src/theme"),
      "@common": path.resolve(__dirname, "./src/common"),
    },
  },
};
