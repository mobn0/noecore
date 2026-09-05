FROM golang@sha256:0ecdc2a9f6156af6451080bfe3d8382a662fcc4e209608c6f919e643453514c1 AS build

WORKDIR /go/src/build

COPY ./src/go.mod ./
COPY ./src/go.sum ./
RUN go mod download

COPY ./src ./
RUN CGO_ENABLED=0 go build -o /go/dist/app ./

FROM alpine@sha256:fd791d74b68913cbb027c6546007b3f0d3bc45125f797758156952bc2d6daf40 AS release

COPY --from=build /go/dist/app /go/run/app


ENTRYPOINT [ "/go/run/app" ]
