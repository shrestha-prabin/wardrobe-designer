```
    <Container style={{ ...containerStyle }}>
        <Section
          style={sectionStyle}
          onSizeChanged={(size) => console.log("size L", size)}
        >
          <Container style={{ height: "100%" }} vertical={true}>
            <Section style={sectionStyle}>
              <Container style={{ ...containerStyle }}>
                <Section
                  style={sectionStyle}
                  onSizeChanged={(size) => console.log("size L", size)}
                >
                  <Container style={{ height: "100%" }} vertical={true}>
                    <Section style={sectionStyle}></Section>
                    <Bar style={barStyleV} size={8} />
                    <Section style={sectionStyle} />
                  </Container>
                </Section>

                <Bar style={barStyle} size={8} />
                <Section style={sectionStyle} />
              </Container>
            </Section>
            <Bar style={barStyleV} size={8} />
            <Section style={sectionStyle} />
          </Container>
        </Section>

        <Bar style={barStyle} size={8} />
        <Section style={sectionStyle} />
    </Container>
```
