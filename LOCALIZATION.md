# Localization Guide

## Overview
This application uses `.resx` resource files for internationalization, following ODSP-web patterns with simplified XML structure.

## Resource File Structure

### Main Resource Files
- `src/strings/app.resx` - Main application strings (title, subtitle)
- `src/strings/tabs.resx` - Tab navigation labels
- `src/strings/common.resx` - Common UI strings (buttons, status text)

### Component Resource Files
- `src/strings/components/basic.resx` - BasicInputsTab strings
- `src/strings/components/datetime.resx` - DateTimeTab strings  
- `src/strings/components/selection.resx` - SelectionTab strings
- `src/strings/components/advanced.resx` - AdvancedTab strings

## .resx File Format
All resource files use simplified XML structure:

```xml
<?xml version="1.0" encoding="utf-8"?>
<root>
  <data name="stringKey" xml:space="preserve">
    <!-- Comment describing what this string is for -->
    <value>Localized text value</value>
  </data>
</root>
```

## TypeScript Integration
- `src/strings/index.ts` - **Actively parses .resx files** and provides string values
- `src/strings/utils.ts` - .resx parsing functions and string interpolation utilities

## Production Implementation
The current implementation:
1. **Directly parses .resx files** at module load time using custom XML parser
2. **No hardcoded strings** exist in TypeScript files - all values come from .resx
3. **Missing string detection** - shows `[Missing: key]` if .resx value not found
4. **Array parsing** - handles comma-separated values in .resx for lists
5. **XML entity decoding** - properly handles &lt;, &gt;, &amp;, &quot; in .resx values

## Current Parsing Features
✅ **Live .resx parsing** - All strings loaded from actual .resx files  
✅ **XML entity handling** - Proper decoding of HTML entities  
✅ **Missing key detection** - Clear error messages for missing strings  
✅ **Array support** - Comma-separated values parsed into arrays  
✅ **Zero hardcoded values** - Pure .resx-driven string system

## String Parameterization
Some strings include placeholders like `{0}`, `{1}`:
- Use `formatString()` utility for interpolation
- Example: `formatString(advancedStrings.buttons.learnMore, productName)`

## Comments in .resx Files
Each string includes a comment explaining its purpose:
- Helps localizers understand context
- Documents UI placement and usage
- Improves translation quality
