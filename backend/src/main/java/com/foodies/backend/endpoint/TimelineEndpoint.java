package com.foodies.backend.endpoint;


import com.foodies.backend.DTO.RecipeResponse;
import com.foodies.backend.security.config.JwtService;
import com.foodies.backend.service.TimelineEndpointService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:5173",
        "http://13.51.176.163:5173",
        "http://127.0.0.11",
        "http://172.26.0.2",
        "http://frontend"})
@RequestMapping("timeline")
@RequiredArgsConstructor
public class TimelineEndpoint {

    private final TimelineEndpointService timelineEndpointService;
    private final JwtService jwtService;


    @GetMapping("/")
    public List<RecipeResponse> getFriendTimeline (@RequestHeader String authorization){

        return timelineEndpointService.getTimelineForUser(jwtService.extractUsername(authorization.substring(7)));

    }

    @GetMapping("/all")
    public List<RecipeResponse> getWholeTimeline () {
        return timelineEndpointService.getWholeTimeline();
    }

}
