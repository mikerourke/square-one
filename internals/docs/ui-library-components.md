# UI Library Components

## Material UI
Material UI components should have inline style objects.  It is possible to wrap existing components using the styled-components library, but that requires overriding the styles with `!important` tag.

Inline styles that have only one property should be placed on one line:
```javascript
<TextField style={{ height: 400 }}>
    Text
</TextField>
```

Anything more should be split across multiple lines:
```javascript
<TextField
    style={{
        fontSize: 12,
        height: 400,
    }}
>
    Text
</TextField>
```

## Styled-Components

Components created using the styled-components library should include only standard HTML objects (`div`, `span`, etc).  Components that encapsulate more than one item should be referred to as `Container`.  Components that only encapsulate one item should be referred to as `Wrapper`.

### Example:

```javascript
const PageContainer = styled.div`
    height: 400px;
    width: 100%;
`;

const ContentContainer = styled.div`
    height: 100px;
    width: 250px;
`;

const HeaderWrapper = styled.div`
    font-size: 14px;
    text-transform: uppercase;
`;

const ExamplePage = () => (
    <PageContainer>
        <HeaderWrapper>
            <div>Page Header</div>
        </HeaderWrapper>
        <ContentContainer>
            <p>Content</p>
            <div>Images</div>
            <ul>List of things</ul>
        </ContentContainer>
    </PageContainer>
)
```
