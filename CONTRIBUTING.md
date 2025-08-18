# Contributing to Info Kode Enroll Bang

Thank you for your interest in contributing to Info Kode Enroll Bang! We welcome contributions from everyone.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- Git

### Development Setup

1. **Fork the repository**
   Click the "Fork" button on the GitHub repository page.

2. **Clone your fork**
   ```bash
   git clone https://github.com/ahargunyllib/info-kode-enroll-bg.git
   cd info-kode-enroll-bang
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/ahargunyllib/info-kode-enroll-bg.git
   ```

4. **Install dependencies**
   ```bash
   pnpm install
   ```

5. **Start development server**
   ```bash
   pnpm dev
   ```

## 📋 How to Contribute

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the issue
- **Expected vs actual behavior**
- **Screenshots** if applicable
- **Environment details** (OS, browser, Node.js version)

### Suggesting Features

Feature requests are welcome! Please:

- **Check existing issues** for similar requests
- **Provide clear use case** and rationale
- **Consider implementation complexity**
- **Be open to discussion** and feedback

### Code Contributions

1. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Make your changes**
   - Follow the existing code style
   - Add tests if applicable
   - Update documentation as needed

3. **Test your changes**
   ```bash
   pnpm run build
   pnpm run lint
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   # or
   git commit -m "fix: resolve issue with..."
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Use our [PR template](.github/pull_request_template.md)
   - Link related issues
   - Provide clear description of changes

## 📝 Code Style

### TypeScript/React Guidelines

- Use **TypeScript** for all new code
- Follow **React best practices** and hooks patterns
- Use **functional components** over class components
- Implement **proper error handling**

### Styling Guidelines

- Use **Tailwind CSS** for styling
- Follow **mobile-first** responsive design
- Use **semantic HTML** elements
- Ensure **accessibility** compliance

### File Organization

- Place components in `components/` directory
- Use custom hooks in `hooks/` directory
- Keep utilities in `lib/` directory
- Follow existing naming conventions

## 🧪 Testing

Currently, the project doesn't have automated tests, but we encourage:

- **Manual testing** of all features
- **Cross-browser compatibility** testing
- **Mobile responsiveness** verification
- **Accessibility** testing

## 📚 Documentation

When contributing:

- Update **README.md** for new features
- Add **JSDoc comments** for complex functions
- Update **type definitions** as needed
- Include **usage examples** where helpful

## 🔄 Pull Request Process

1. **Ensure CI passes** (linting, building)
2. **Update documentation** if needed
3. **Request review** from maintainers
4. **Address feedback** promptly
5. **Squash commits** if requested

### PR Guidelines

- **One feature per PR** - keep changes focused
- **Clear commit messages** following conventional commits
- **Test thoroughly** before submitting
- **Be responsive** to review feedback

## 🏷️ Commit Message Format

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

**Examples:**
```bash
feat(ocr): add support for multiple image formats
fix(ui): resolve mobile layout issues
docs(readme): update installation instructions
```

## 🤝 Code of Conduct

### Our Standards

- **Be respectful** and inclusive
- **Welcome newcomers** and help them learn
- **Focus on constructive feedback**
- **Respect different viewpoints**

### Unacceptable Behavior

- Harassment or discrimination
- Trolling or insulting comments
- Publishing private information
- Unprofessional conduct

## 📞 Getting Help

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Email**: [billy.bpm03@gmail.com] for private matters

## 🎉 Recognition

Contributors will be:

- **Listed in README.md** acknowledgments
- **Mentioned in release notes** for significant contributions
- **Invited as collaborators** for consistent contributors

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Info Kode Enroll Bang! 🚀
