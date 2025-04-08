# Windsurf Rules for Code Modifications

## Best Practices for Component Modifications

### Avoid Complete Rewrites When Possible

**IMPORTANT:** Refrain from completely rewriting components unless absolutely necessary. Complete rewrites pose several risks:

- **Loss of Important Functionality**: Existing components often contain carefully implemented features that may not be immediately obvious.
- **Version Regression**: Complete rewrites risk destroying important implementation versions and historical context.
- **Increased Bug Risk**: Rewriting large portions of code increases the chance of introducing new bugs.
- **Testing Burden**: Complete rewrites require comprehensive re-testing of all component functionality.

### Recommended Approach

Instead of complete rewrites, follow these guidelines:

1. **Incremental Changes**: Make targeted modifications to fix specific issues.
2. **Refactoring**: Extract parts of components into smaller, reusable pieces.
3. **Careful Versioning**: Use version control properly to track changes.
4. **Code Comments**: Document complex logic and decisions in your code.

### When Modifying Components:

- Understand the existing code thoroughly before making changes
- Test modifications against all expected component behaviors
- Communicate significant changes to the team
- Update related documentation and tests

## Additional Guidelines

- Always maintain a consistent coding style
- Use the established component patterns in the codebase
- Write clear commit messages explaining the purpose of changes
- Consider performance implications of modifications
