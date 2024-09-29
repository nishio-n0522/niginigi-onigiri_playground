FROM public.ecr.aws/lambda/python:3.9

COPY requirements.txt ./
RUN python3.9 -m pip install -r requirements.txt -t .
RUN pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu
RUN pip install pydub

RUN yum update -y && yum install -y tar gzip xz

RUN curl -O https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-amd64-static.tar.xz && \
    tar -xJf ffmpeg-release-amd64-static.tar.xz && \
    mv ffmpeg-*/ffmpeg /usr/local/bin/ && \
    mv ffmpeg-*/ffprobe /usr/local/bin/ && \
    rm -rf ffmpeg-*

COPY app.py ./

# Command can be overwritten by providing a different command in the template directly.
CMD ["app.lambda_handler"]
